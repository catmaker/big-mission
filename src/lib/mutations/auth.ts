import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { authService } from "@/lib/services/auth";
import { AuthError } from "@/types/api";

interface SigninResponse {
  accessToken: string;
  refreshToken: string;
}

export function useSignupMutation(onSuccess?: () => void) {
  return useMutation({
    mutationFn: authService.signup,

    onSuccess: () => {
      toast.success("회원가입에 성공했습니다.");
      onSuccess?.();
    },
    onError: (error: unknown) => {
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else {
        toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    },
  });
}

export function useSigninMutation(onSuccess?: () => void) {
  return useMutation({
    mutationFn: authService.signin,
    onSuccess: (data) => {
      console.log("mutation 성공:", data);
      toast.success("로그인에 성공했습니다.");
      onSuccess?.();
    },
    onError: (error: any) => {
      console.log('전체 에러 객체:', error);
      console.log('에러 응답:', error.response);
      console.log('에러 메시지:', error.message);
      
      // 서버 응답이 있는 경우와 없는 경우를 구분
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  });
}
