import { authStore } from "@/stores/auth-store";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const executeRequest = async () => {
    const headers = {
      Authorization: `Bearer ${authStore.accessToken}`,
      ...(!(options.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
    };

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let response = await executeRequest();

  if (response.status === 401) {
    const refreshed = await authStore.refreshAccessToken();
    if (refreshed) {
      response = await executeRequest();
    } else {
      throw new Error("인증이 필요합니다");
    }
  }

  return response;
}
