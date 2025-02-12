"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchWithAuth } from "@/lib/api";
import { EditFormComponent } from "./components/edit-form";
import { EditForm } from "./components/edit-validation";
import { useUpdateBoardMutation, useBoardDetailQuery } from "@/lib/mutations/board";

export default function BoardEditPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data: post, isLoading } = useBoardDetailQuery(params.slug);
  
  const updateBoard = useUpdateBoardMutation(params.slug, () => {
    router.push(`/boards/${params.slug}`);
  });


  const onSubmit = async (data: EditForm) => {
    updateBoard.mutate(data);
  };

  if (updateBoard.isPending) {
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

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto py-12">
          <div className="mb-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-6 w-72 mt-2" />
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-14 w-full rounded-xl" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-[400px] w-full rounded-xl" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-14 w-full rounded-xl" />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Skeleton className="h-11 w-24 rounded-xl" />
              <Skeleton className="h-11 w-24 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}