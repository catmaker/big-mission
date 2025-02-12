"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { NextImageComponent } from "@/components/next-image-component";
import { BoardHeader } from "./components/board-header";
import { BoardActions } from "./components/board-actions";
import { useBoardDetailQuery } from "@/lib/mutations/board";

export default function BoardDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: post, isLoading } = useBoardDetailQuery(params.slug);
  const BASE_URL = "https://front-mission.bigs.or.kr";

  if (isLoading || !post) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="overflow-hidden min-h-[80vh] flex flex-col">
        <BoardHeader post={post} />
        <div className="p-6 flex-grow">
          <div className="prose prose-slate max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed">
              {post?.content}
            </p>
          </div>
        </div>
        {post?.imageUrl && (
          <div className="p-6 flex-grow">
            <div className="flex justify-center">
              <a
                href={`${BASE_URL}${post.imageUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-3xl w-full"
              >
                <NextImageComponent path={post.imageUrl} className="w-full" />
              </a>
            </div>
          </div>
        )}
        <BoardActions boardId={Number(params.slug)} />
      </Card>
    </div>
  );
}
