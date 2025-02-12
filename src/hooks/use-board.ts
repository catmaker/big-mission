import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/lib/api";

// 게시글 목록 조회
export function useBoards() {
  return useQuery<any>({
    queryKey: ["boards"],
    queryFn: async () => {
      const response = await fetchWithAuth(
        "https://front-mission.bigs.or.kr/boards"
      );
      return response.json();
    },
  });
}

// 게시글 작성
export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetchWithAuth("/boards", {
        method: "POST",
        body: data,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
