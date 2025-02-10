import { SignupForm } from "@/app/(auth)/signup/components/signup-validation";
import { ApiValidationError } from "@/types/api";

const API_BASE_URL = "https://front-mission.bigs.or.kr";

export class AuthError extends Error {
  constructor(
    message: string,
    public errors?: ApiValidationError,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export const authService = {
  async signup(data: SignupForm): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status < 500) {
          const errorData: ApiValidationError = await response.json();
          const errorMessage =
            Object.values(errorData)[0]?.[0] || "회원가입에 실패했습니다";
          throw new AuthError(errorMessage, errorData, response.status);
        }

        throw new AuthError(
          "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
          undefined,
          response.status
        );
      }
    } catch (error: unknown) {
      if (
        error instanceof TypeError ||
        (error &&
          typeof error === "object" &&
          "name" in error &&
          error.name === "TypeError")
      ) {
        console.error("Network Error:", error);
        throw new AuthError("네트워크 연결을 확인해주세요.");
      }
      if (error instanceof AuthError) {
        throw error;
      }
      console.error("Unexpected Error:", error);
      throw new AuthError(
        "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  },
};
