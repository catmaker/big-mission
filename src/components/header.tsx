"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/auth-store";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const router = useRouter();

  return (
    <nav
      className={`bg-[rgba(251,251,253,0.8)] backdrop-blur-md fixed w-full z-50 border-b border-gray-200/80 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="h-12 flex items-center justify-between">
          <div className="text-sm font-medium space-x-8">
            <Image
              className="cursor-pointer"
              src="/bigsLogo.png"
              alt="logo"
              width={100}
              height={100}
              onClick={() => router.push("/")}
            />
          </div>
          <div className="space-x-4">
            {authStore.isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => router.push("/write")}
                >
                  글쓰기
                </Button>
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => authStore.logout()}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
