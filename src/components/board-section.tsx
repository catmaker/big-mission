"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BoardList from "./board-list";
import { authStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";

export default function BoardSection() {
  const router = useRouter();
  const token = authStore.getToken();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-2">게시판</h2>
          <p className="text-gray-600">전체 게시글 목록입니다</p>
        </div>
        <div className="flex justify-center flex-col items-center">
          <BoardList />
          {token ? (
            <Button
              variant="outline"
              className="mt-8"
              onClick={() => router.push("/boards")}
            >
              전체 게시글 보기
            </Button>
          ) : (
            <>
              <p className="text-gray-600">
                게시글을 작성하려면 로그인이 필요합니다.
              </p>
              <Button
                variant="outline"
                className="mt-8"
                onClick={() => router.push("/signin")}
              >
                첫 게시글 작성하기
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
