import axios, { AxiosError } from "axios";
import type { SignupForm } from "@/app/(auth)/signup/components/signup-validation";
import type { SigninForm } from "@/app/(auth)/signin/components/signin-validation";
import { AuthError } from "@/types/api";
import { authStore } from "@/stores/auth-store";

interface ApiErrorResponse {
  username?: string[];
  message?: string;
}
interface SigninResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    username: string;
    name: string;
  };
}

const authClient = axios.create({
  baseURL: "https://front-mission.bigs.or.kr",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

authClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    console.log("인터셉터 에러:", error);  // 디버깅용
    
    // 응답이 있고 데이터가 있는 경우
    if (error.response?.data) {
      const { data } = error.response;
      
      if (data.username) {
        throw new AuthError(data.username[0]);
      }
      if (data.message) {
        throw new AuthError(data.message.split("\n")[0]);
      }
    }
    
    // 응답이 아예 없는 경우에만 네트워크 에러
    if (!error.response) {
      throw new AuthError("네트워크 연결을 확인해주세요.");
    }

    // 기타 에러
    throw new AuthError("요청 처리 중 오류가 발생했습니다.");
  }
);

export const authService = {
  async signup(data: SignupForm): Promise<void> {
    await authClient.post("/auth/signup", data);
  },

  async signin(data: SigninForm): Promise<SigninResponse> {
    const response = await authClient.post<SigninResponse>(
      "/auth/signin",
      data
    );
    const { accessToken, refreshToken, user } = response.data;

    authStore.setTokens(accessToken, refreshToken);
    authStore.user = user;

    return response.data;
  },
};
