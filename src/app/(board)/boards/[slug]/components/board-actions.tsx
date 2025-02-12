"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeleteBoardMutation } from "@/lib/mutations/board";

interface BoardActionsProps {
  boardId: number;
}

export function BoardActions({ boardId }: BoardActionsProps) {
  const router = useRouter();
  const deleteBoard = useDeleteBoardMutation(() => {
    router.push("/boards");
  });

  return (
    <div className="border-t mt-auto flex">
      <button
        className="w-full p-4 text-sm text-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
        onClick={() => router.push(`/boards/${boardId}/edit`)}
      >
        <Pencil size={16} />
      </button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-full p-4 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
            <Trash2 size={16} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteBoard.mutate(boardId)}
              className="bg-red-500 hover:bg-red-600"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
