import { toast } from "react-hot-toast";

interface ErrorWithMessage {
  message: string;
  stack?: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

let isInitialized = false;

export function setupGlobalErrorHandlers() {
  if (isInitialized || typeof window === "undefined") return;

  const handleError = (error: unknown) => {
    if (document.querySelector("[role='status']")) return;

    const errorWithMessage = toErrorWithMessage(error);
    console.error("Global Error:", errorWithMessage);
    toast.error("예기치 않은 오류가 발생했습니다.");
  };

  const errorHandler = (event: ErrorEvent) => {
    event.preventDefault();
    handleError(event.error);
  };

  const rejectionHandler = (event: PromiseRejectionEvent) => {
    event.preventDefault();
    handleError(event.reason);
  };

  window.removeEventListener("error", errorHandler);
  window.removeEventListener("unhandledrejection", rejectionHandler);

  window.addEventListener("error", errorHandler);
  window.addEventListener("unhandledrejection", rejectionHandler);

  isInitialized = true;

  // 개발 환경에서만 로그
  if (process.env.NODE_ENV === "development") {
    console.log("Global error handlers initialized");
  }
}