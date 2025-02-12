"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CategoryLabel } from "@/utils/category-label";
import { formatDate } from "@/utils/date";
import { Board } from "@/types/board";

interface BoardHeaderProps {
  post: Board;
}

export function BoardHeader({ post }: BoardHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6 border-b">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
        <div>
          {post.boardCategory && (
            <CategoryLabel category={post.boardCategory} />
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>
            {getInitials(post.author?.name || "Unknown")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{post.author?.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
