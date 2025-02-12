"use client";

import { useRouter } from "next/navigation";
import { EditFormComponent } from "./components/edit-form";
import { EditForm } from "./components/edit-validation";
import { useUpdateBoardMutation, useBoardDetailQuery } from "@/lib/mutations/board";
import LoadingSkeleton from "./components/skeleton";

export default function BoardEditPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data: post, isLoading } = useBoardDetailQuery(params.slug);
  
  const updateBoard = useUpdateBoardMutation(params.slug, () => {
    router.push(`/boards/${params.slug}`);
  });


  const onSubmit = async (data: EditForm) => {
    updateBoard.mutate(data);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              게시글 수정
            </h1>
            <p className="mt-2 text-gray-500">게시글 내용을 수정해주세요</p>
          </div>

          <EditFormComponent
            post={post}
            onSubmit={onSubmit}
            onCancel={() => router.back()}
            isSubmitting={updateBoard.isPending}
          />
        </div>
      </div>
    </div>
  );
}
