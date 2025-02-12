import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { BoardListResponse, Board, BoardCategory } from "@/types/board";
import { authStore } from "@/stores/auth-store";

interface ApiErrorResponse {
  message?: string;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const boardClient = axios.create({
  baseURL: "https://front-mission.bigs.or.kr",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - 토큰 주입
boardClient.interceptors.request.use((config) => {
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
});

// Request Interceptor
boardClient.interceptors.request.use(
  (config) => {
    const token = authStore.accessToken;
    if (token) {
      // headers 객체가 없으면 생성
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
boardClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (!originalRequest) {
      throw error;
    }

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 토큰 갱신 시도");
        const response = await fetch(
          "https://front-mission.bigs.or.kr/auth/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: authStore.refreshToken }),
          }
        );

        if (!response.ok) {
          console.log("❌ 토큰 갱신 실패 - 로그아웃");
          authStore.logout();
          throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
        }

        const data = await response.json();
        console.log("✅ 토큰 갱신 성공");

        // 새 토큰 저장
        authStore.setTokens(data.accessToken, data.refreshToken);

        // 원래 요청 재시도
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return boardClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ 토큰 갱신 중 에러:", refreshError);
        authStore.logout();
        throw new Error("인증 처리 중 오류가 발생했습니다.");
      }
    }

    // 다른 에러인 경우
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("요청 처리 중 오류가 발생했습니다.");
  }
);

export const boardService = {
  // 게시글 목록 조회
  async getBoards(page = 0, size = 10): Promise<BoardListResponse> {
    const response = await boardClient.get<BoardListResponse>(
      `/boards?page=${page}&size=${size}`
    );
    return response.data;
  },

  // 게시글 상세 조회
  async getBoard(id: number): Promise<Board> {
    const response = await boardClient.get<Board>(`/boards/${id}`);
    return response.data;
  },

  // 게시글 작성
  async createBoard(formData: FormData): Promise<Board> {
    const response = await boardClient.post<Board>("/boards", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // 게시글 수정
  async updateBoard(id: number, formData: FormData): Promise<Board> {
    const response = await boardClient.put<Board>(`/boards/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // 게시글 삭제
  async deleteBoard(id: number): Promise<void> {
    await boardClient.delete(`/boards/${id}`);
  },
};

export default boardService;
