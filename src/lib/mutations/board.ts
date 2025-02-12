import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { boardService } from "@/lib/services/board";
import type { Board } from "@/types/board";
import boardClient from "@/lib/services/board";

import type {
  BoardListResponse,
  CreateBoardDto,
  UpdateBoardDto,
} from "@/types/board";

// Query Keys
export const boardKeys = {
  all: ["boards"] as const,
  lists: () => ["boards", "lists"] as const,
  list: (page: number, size: number) =>
    ["boards", "lists", { page, size }] as const,
  detail: (id: number) => ["boards", id] as const,
};

// Queries
export function useBoardListQuery(page: number, size: number) {
  return useQuery<BoardListResponse>({
    queryKey: boardKeys.list(page, size),
    queryFn: () => boardService.getBoards(page, size),
  });
}

export function useBoardDetailQuery(slug: string) {
  return useQuery({
    queryKey: boardKeys.detail(Number(slug)),
    queryFn: () => boardService.getBoard(Number(slug)),
  });
}

// Mutations
export function useCreateBoardMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();

      // request 필드에 JSON Blob 추가
      const requestBlob = new Blob(
        [
          JSON.stringify({
            title: data.title,
            content: data.content,
            category: data.category,
          }),
        ],
        { type: "application/json" }
      );
      formData.append("request", requestBlob);

      // 파일이 있으면 추가
      if (data.file?.[0]) {
        formData.append("file", data.file[0]);
      }

      const response = await boardClient.createBoard(formData);
      return response;
    },
    onSuccess: () => {
      toast.success("게시글이 작성되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || "게시글 작성에 실패했습니다");
    },
  });
}

export function useUpdateBoardMutation(id: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => boardService.updateBoard(id, formData),
    onSuccess: () => {
      toast.success("게시글이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["boards", id] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteBoardMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => boardService.deleteBoard(id),
    onSuccess: () => {
      toast.success("게시글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
