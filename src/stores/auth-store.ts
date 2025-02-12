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
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      // 토큰 유효성 먼저 확인
      const tokenData = parseJwt(accessToken);
      const isExpired = tokenData?.exp
        ? tokenData.exp * 1000 < Date.now()
        : true;

      if (isExpired) {
        this.refreshTokens();
      } else {
        this.setTokens(accessToken, refreshToken);
      }
    } else {
      console.log("💾 저장된 토큰 없음");
    }
  }

  private startRefreshTimer() {
    if (this.refreshTokenTimer) {
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
      this.logout();
      return;
    }

    try {

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


      if (!response.ok) {
        this.logout();
        return;
      }

      this.setTokens(responseData.accessToken, responseData.refreshToken);
    } catch (error) {
      this.logout();
    }
  }

  updateAccessToken(access: string) {
    this.accessToken = access;
    localStorage.setItem("accessToken", access);
    document.cookie = `accessToken=${access}; path=/; secure; samesite=lax`;

    const userData = parseJwt(access);
    if (userData) {
      this.user = {
        username: userData.username,
        name: userData.name,
      };
    }
  }

  setTokens(access: string | null, refresh: string | null) {
    this.accessToken = access;
    this.refreshToken = refresh;

    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      document.cookie = `accessToken=${access}; path=/; secure; samesite=lax`;
      document.cookie = `refreshToken=${refresh}; path=/; secure; samesite=lax`;

      const userData = parseJwt(access);
      if (userData) {
        this.user = {
          username: userData.username,
          name: userData.name,
        };
      }

      this.startRefreshTimer();
    } else {
      this.clearTokens();
    }
  }

  private clearTokens() {
    if (this.refreshTokenTimer) {
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
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }

  getToken() {
    if (typeof window === "undefined") {  // !== 를 === 로 수정
      return null;
    }
    return localStorage.getItem("accessToken");
  }


  logout() {
    this.clearTokens();
    window.location.href = "/signin";
  }
}

export const authStore = new AuthStore();
