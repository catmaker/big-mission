import { makeAutoObservable } from "mobx";

interface User {
  username: string;
  name: string;
}

class AuthStore {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.accessToken = localStorage.getItem("accessToken");
    this.refreshToken = localStorage.getItem("refreshToken");
  }

  setTokens(access: string | null, refresh: string | null) {
    this.accessToken = access;
    this.refreshToken = refresh;

    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }

  setUser(user: User | null) {
    this.user = user;
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }

  async refreshAccessToken() {
    try {
      if (!this.refreshToken) throw new Error("No refresh token");

      const response = await fetch(
        "https://front-mission.bigs.or.kr/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: this.refreshToken,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        this.setTokens(data.accessToken, data.refreshToken);
        return true;
      }

      this.logout();
      return false;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  logout() {
    this.setTokens(null, null);
    this.setUser(null);
    window.location.href = "/signin";
  }
}

export const authStore = new AuthStore();
