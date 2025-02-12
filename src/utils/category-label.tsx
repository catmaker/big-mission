import { cn } from "@/lib/utils";
import { BoardCategory } from "@/types/board";

interface CategoryLabelProps {
  category: BoardCategory;
  className?: string;
}

export function CategoryLabel({ category, className }: CategoryLabelProps) {
  const styles = {
    NOTICE: "bg-red-500 text-white",
    FREE: "bg-gray-100 text-gray-600",
    QNA: "bg-indigo-600 text-white",
    ETC: "bg-gray-300 text-gray-600",
  };

  const labels = {
    NOTICE: "공지",
    FREE: "자유",
    QNA: "질문",
    ETC: "기타",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded",
        styles[category as keyof typeof styles],
        className
      )}
    >
      {labels[category as keyof typeof labels]}
    </span>
  );
}
