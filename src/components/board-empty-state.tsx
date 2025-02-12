import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PenLine } from "lucide-react";

interface BoardEmptyStateProps {
  type: "no-posts" | "no-filtered-posts";
  category?: string;
  onWrite?: () => void;
}

export function BoardEmptyState({
  type,
  category,
  onWrite,
}: BoardEmptyStateProps) {
  return (
    <Card className="p-8 text-center">
      <div className="space-y-3">
        <PenLine className="w-12 h-12 text-gray-400 mx-auto" />
        <p className="text-gray-500">
          {type === "no-posts"
            ? "아직 작성된 글이 없습니다."
            : category === "ALL"
              ? "작성된 글이 없습니다."
              : "해당 카테고리에 작성된 글이 없습니다."}
        </p>
        {type === "no-posts" && onWrite && (
          <Button variant="outline" onClick={onWrite} className="mt-4">
            첫 게시글 작성하기
          </Button>
        )}
      </div>
    </Card>
  );
}
