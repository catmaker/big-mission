"use client";

import { useEffect } from "react";
import { authStore } from "@/stores/auth-store";

export function AuthInitializer() {
  useEffect(() => {
    authStore.initializeStore();
  }, []);

  return null;
}
