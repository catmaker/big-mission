import { makeAutoObservable } from "mobx";

interface User {
  username: string;
  name: string;
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

class AuthStore {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  user: User | null = null;
  private refreshTokenTimer: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.initializeStore();
    }
  }

  private initializeStore() {
    console.log("🔍 스토어 초기화 시작");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      // 토큰 유효성 먼저 확인
      const tokenData = parseJwt(accessToken);
      const isExpired = tokenData?.exp
        ? tokenData.exp * 1000 < Date.now()
        : true;

      console.log("💾 토큰 상태 확인", {
        hasTokens: true,
        expiresAt: tokenData?.exp
          ? new Date(tokenData.exp * 1000).toISOString()
          : "unknown",
        isExpired,
      });

      if (isExpired) {
        // 만료된 경우 즉시 갱신 시도
        this.refreshTokens();
      } else {
        // 유효한 경우 토큰 설정 및 타이머 시작
        this.setTokens(accessToken, refreshToken);
      }
    } else {
      console.log("💾 저장된 토큰 없음");
    }
  }

  private startRefreshTimer() {
    if (this.refreshTokenTimer) {
      console.log("🔄 기존 타이머 제거");
      clearTimeout(this.refreshTokenTimer);
    }

    // 토큰 만료 2분 전에 갱신 시도
    const tokenData = parseJwt(this.accessToken!);
    if (tokenData?.exp) {
      const expiresAt = tokenData.exp * 1000;
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;
      const refreshTime = Math.max(0, timeUntilExpiry - 2 * 60 * 1000); // 만료 2분 전

      console.log("⏰ 토큰 갱신 타이머 설정", {
        현재시각: new Date(now).toISOString(),
        만료시각: new Date(expiresAt).toISOString(),
        남은시간: Math.round(timeUntilExpiry / 1000) + "초",
        갱신예정: Math.round(refreshTime / 1000) + "초 후",
      });

      this.refreshTokenTimer = setTimeout(() => {
        console.log("⏰ 토큰 갱신 타이머 실행");
        this.refreshTokens();
      }, refreshTime);
    }
  }

  private async refreshTokens() {
    if (!this.refreshToken) {
      console.log("❌ 리프레시 토큰 없음");
      this.logout();
      return;
    }

    try {
      console.log("🔄 토큰 갱신 시도", {
        refreshToken: this.refreshToken.slice(0, 20) + "...",
        time: new Date().toISOString(),
      });

      const response = await fetch(
        "https://front-mission.bigs.or.kr/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        }
      );

      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText;
      }

      console.log("🔄 갱신 응답:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseData,
      });

      if (!response.ok) {
        console.log("❌ 토큰 갱신 실패 - 로그아웃", {
          status: response.status,
          error: responseData,
        });
        this.logout();
        return;
      }

      console.log("✅ 토큰 갱신 성공");
      this.setTokens(responseData.accessToken, responseData.refreshToken);
    } catch (error) {
      console.error("❌ 토큰 갱신 중 에러:", error);
      this.logout();
    }
  }

  updateAccessToken(access: string) {
    console.log("🔑 액세스 토큰 업데이트", {
      newToken: access.slice(0, 20) + "...",
    });
    this.accessToken = access;
    localStorage.setItem("accessToken", access);
    document.cookie = `accessToken=${access}; path=/; secure; samesite=lax`;

    const userData = parseJwt(access);
    if (userData) {
      console.log("👤 사용자 정보 업데이트", userData);
      this.user = {
        username: userData.username,
        name: userData.name,
      };
    }
  }

  setTokens(access: string | null, refresh: string | null) {
    console.log("🔐 토큰 설정", {
      accessToken: access?.slice(0, 20) + "...",
      refreshToken: refresh?.slice(0, 20) + "...",
    });

    this.accessToken = access;
    this.refreshToken = refresh;

    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      document.cookie = `accessToken=${access}; path=/; secure; samesite=lax`;
      document.cookie = `refreshToken=${refresh}; path=/; secure; samesite=lax`;

      const userData = parseJwt(access);
      if (userData) {
        console.log("👤 사용자 정보 설정", userData);
        this.user = {
          username: userData.username,
          name: userData.name,
        };
      }

      console.log("⏰ 토큰 자동 갱신 타이머 시작");
      this.startRefreshTimer();
    } else {
      console.log("🗑️ 토큰 초기화");
      this.clearTokens();
    }
  }

  private clearTokens() {
    console.log("🧹 토큰 정리 시작");
    if (this.refreshTokenTimer) {
      console.log("⏰ 타이머 정리");
      clearTimeout(this.refreshTokenTimer);
      this.refreshTokenTimer = null;
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    console.log("✨ 토큰 정리 완료");
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }

  getToken() {
    if (typeof window === "undefined") {  
      return null;
    }
    return localStorage.getItem("accessToken");
  }


  logout() {
    console.log("👋 로그아웃");
    this.clearTokens();
    window.location.href = "/signin";
  }
}

export const authStore = new AuthStore();
