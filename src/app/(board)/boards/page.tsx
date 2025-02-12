"use client";

import { Separator } from "@/components/ui/separator";
import BoardListPagination from "@/components/board-list-pagination";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BoardsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fbfbfd] py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold tracking-tight">게시판</h1>
          <Button
            onClick={() => router.push("/boards/write")}
            className="flex items-center gap-2"
          >
            <PenSquare className="h-4 w-4" />
            글쓰기
          </Button>
        </div>
        <Separator className="my-4" />
        <BoardListPagination />
      </div>
    </div>
  );
}
