import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export function useQueryErrorHandler() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const processedErrors = new Set();

    const getErrorMessage = (error: unknown) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        switch (status) {
          case 401:
            return "로그인이 필요합니다.";
          case 403:
            return "접근 권한이 없습니다.";
          case 404:
            return "요청한 리소스를 찾을 수 없습니다.";
          case 500:
            return "서버 오류가 발생했습니다.";
          default:
            return "요청 처리 중 오류가 발생했습니다.";
        }
      }

      return "알 수 없는 오류가 발생했습니다.";
    };

    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event.type === "updated" && event.query.state.error) {
        const errorMessage = getErrorMessage(event.query.state.error);

        const errorKey = `${event.query.queryKey.join("-")}-${errorMessage}`;
        if (processedErrors.has(errorKey)) {
          return;
        }
        processedErrors.add(errorKey);

        setTimeout(() => {
          processedErrors.delete(errorKey);
        }, 1000);

        if (
          event.query.state.error instanceof AxiosError &&
          event.query.state.error.response?.status === 401
        ) {
          window.location.href = "/signin";
        }

        toast.error(errorMessage);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);
}
