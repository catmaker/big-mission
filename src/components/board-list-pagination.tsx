"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { BoardEmptyState } from "./board-empty-state";
import { Pagination } from "./pagination";
import { BoardListHeader } from "./board-list-header";
import { BoardListTable } from "./board-list-table";
import { LoadingState } from "./ui/loading-state";
import type { BoardCategory } from "@/types/board";
import { useQuery } from "@tanstack/react-query";
import { boardService } from "@/lib/services/board";

export default function BoardListPagination() {
  const [selectedCategory, setSelectedCategory] = useState<
    BoardCategory | "ALL"
  >("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const [displaySize, setDisplaySize] = useState(10);
  const router = useRouter();

  // 초기 데이터 로드 (빠른 로드)
  const { data: initialData, isLoading: initialLoading } = useQuery({
    queryKey: ["boards", "initial"],
    queryFn: () => boardService.getBoards(0, 10),
  });

  // 전체 데이터 로드 (백그라운드)
  const { data: fullData, isLoading: fullLoading } = useQuery({
    queryKey: ["boards", "full"],
    queryFn: () => boardService.getBoards(0, 10000),
    enabled: !!initialData, // 초기 데이터 로드 후에만 실행
  });

  // 사용할 데이터 선택
  const data = fullData || initialData;

  const filteredBoards = useMemo(() => {
    const boards = data?.content || [];
    if (selectedCategory === "ALL") return boards;
    return boards.filter((board) => board.category === selectedCategory);
  }, [data?.content, selectedCategory]);

  const currentBoards = filteredBoards.slice(
    currentPage * displaySize,
    (currentPage + 1) * displaySize
  );

  const headerComponent = (
    <BoardListHeader
      totalPosts={data?.totalElements ?? 0}
      selectedCategory={selectedCategory}
      displaySize={displaySize}
      onCategoryChange={(value) => {
        setSelectedCategory(value);
        setCurrentPage(0);
      }}
      onDisplaySizeChange={(value) => {
        setDisplaySize(Number(value));
        setCurrentPage(0);
      }}
    />
  );

  if (initialLoading) {
    return <LoadingState header={headerComponent} />;
  }

  if (
    data?.totalElements === 0 ||
    (!initialLoading && filteredBoards.length === 0)
  ) {
    return (
      <div className="w-full mx-auto">
        {headerComponent}
        <BoardEmptyState
          type={data?.totalElements === 0 ? "no-posts" : "no-filtered-posts"}
          category={selectedCategory}
          onWrite={() => router.push("/boards/write")}
        />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {headerComponent}
      <BoardListTable
        boards={currentBoards}
        isLoading={initialLoading}
        onBoardClick={(boardId) => router.push(`/boards/${boardId}`)}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredBoards.length / displaySize)}
        onPageChange={setCurrentPage}
      />
      {fullLoading && (
        <div className="text-center text-sm text-gray-500 mt-2">
          추가 데이터 로딩 중...
        </div>
      )}
    </div>
  );
}
