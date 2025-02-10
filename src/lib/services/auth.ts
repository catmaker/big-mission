import axios, { AxiosError } from "axios";
import type { SignupForm } from "@/app/(auth)/signup/components/signup-validation";
import { AuthError } from "@/types/api";

interface ApiErrorResponse {
  username?: string[];
  message?: string;
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
    if (!error.response) {
      throw new AuthError("네트워크 연결을 확인해주세요.");
    }

    const { data } = error.response;

    if (data?.username) {
      throw new AuthError(data.username[0]);
    }
    if (data?.message) {
      throw new AuthError(data.message.split("\n")[0]);
    }
    throw new AuthError("요청 처리 중 오류가 발생했습니다.");
  }
);

export const authService = {
  async signup(data: SignupForm): Promise<void> {
    await authClient.post("/auth/signup", data);
  },
};
