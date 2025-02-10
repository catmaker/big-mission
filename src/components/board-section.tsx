"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BoardList from "./board-list";

export default function BoardSection() {
  const router = useRouter();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-2">게시판</h2>
          <p className="text-gray-600">전체 게시글 목록입니다</p>
        </div>
        <div className="flex justify-center flex-col items-center">
          <BoardList />
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => router.push("/boards")}
          >
            전체 게시글 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
