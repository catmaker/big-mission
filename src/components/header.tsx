"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/auth-store";
import { useState, useEffect } from "react";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const userName = authStore.user?.name;
  const userUserName = authStore.user?.username;

  console.log(userName, userUserName);
  return (
    <nav
      className={`bg-[rgba(251,251,253,0.8)] backdrop-blur-md fixed w-full z-50 border-b border-gray-200/80 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="h-12 flex items-center justify-between">
          <div className="text-sm font-medium space-x-8">
            <Image
              className="cursor-pointer"
              src="/imgs/Logo.png"
              alt="logo"
              width={40}
              height={40}
              onClick={() => router.push("/")}
            />
          </div>
          <div className="space-x-4">
            {authStore.isAuthenticated ? (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => router.push("/boards/write")}
                >
                  글쓰기
                </Button>
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => router.push("/profile")}
                >
                  마이페이지
                </Button>
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => authStore.logout()}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => router.push("/signin")}
                >
                  로그인
                </Button>
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => router.push("/signup")}
                >
                  회원가입
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
