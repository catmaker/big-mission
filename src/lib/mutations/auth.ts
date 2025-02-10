import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { authService } from "@/lib/services/auth";
import { AuthError } from "@/types/api";

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
