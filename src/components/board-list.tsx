"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useBoardListQuery } from "@/lib/mutations/board";
import { LoadingState } from "./ui/loading-state";
import { useEffect, useState } from "react";
import { Board } from "@/types/board";

export default function BoardList() {
  const { data, error } = useBoardListQuery(0, 10);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => { 
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-500">
        데이터를 불러오지 못했어요 😂 다시 시도해주세요.
      </div>
    );
  }

  const boards = data?.content || [];
  const sortedBoards = [...boards].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const latestBoards = sortedBoards.slice(0, 6);
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestBoards.map((board: Board) => (
          <Card
            key={board.id}
            className="hover:shadow-lg transition-shadow h-[200px] cursor-pointer hover:scale-105 duration-150"
            onClick={() => router.push(`/boards/${board.id}`)}
          >
            <CardHeader className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {board.category === "NOTICE" && (
                      <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded">
                        공지
                      </span>
                    )}
                    {board.category === "FREE" && (
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                        자유
                      </span>
                    )}
                  </div>
                  <time className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(board.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </time>
                </div>
                <CardTitle className="mt-4">{board.title}</CardTitle>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
