"use client";

import { WriteForm } from "./components/write-form";
import { useCreateBoardMutation } from "@/lib/mutations/board";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function WritePage() {
  const router = useRouter();
  const createBoard = useCreateBoardMutation(() => {
    router.push("/boards");
  });

  const onSubmit = async (data: any) => {
    createBoard.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              새 글 작성
            </h1>
            <p className="mt-2 text-gray-500">여러분의 이야기를 공유해주세요</p>
          </div>

          <WriteForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
