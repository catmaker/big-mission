import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BoardCategory as BoardCategoryType } from "@/types/board";

interface BoardListHeaderProps {
  totalPosts: number;
  selectedCategory: BoardCategoryType;
  displaySize: number;
  onCategoryChange: (value: BoardCategoryType) => void;
  onDisplaySizeChange: (value: string) => void;
  disableCategory?: boolean;
}

export function BoardListHeader({
  totalPosts,
  selectedCategory,
  displaySize,
  onCategoryChange,
  onDisplaySizeChange,
  disableCategory,
}: BoardListHeaderProps) {
  const categories = [
    { value: "ALL", label: "전체 보기" },
    { value: "NOTICE", label: "공지사항" },
    { value: "FREE", label: "자유게시판" },
    { value: "QNA", label: "질문답변" },
    { value: "ETC", label: "기타" },
  ];

  const displaySizeOptions = [
    { value: "10", label: "10개씩 보기" },
    { value: "20", label: "20개씩 보기" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 whitespace-nowrap">
      <div className="text-sm text-gray-500 mb-2 sm:mb-0">
        총 {(totalPosts ?? 0).toLocaleString()}개의 게시글
      </div>
      <div className="flex gap-4">
        <Select
          value={selectedCategory}
          onValueChange={onCategoryChange}
          disabled={disableCategory}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={displaySize.toString()}
          onValueChange={onDisplaySizeChange}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="페이지당 게시글 수" />
          </SelectTrigger>
          <SelectContent>
            {displaySizeOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export type BoardCategory = "ALL" | "NOTICE" | "FREE" | "QNA" | "ETC";

export type DisplaySizeOption = 10 | 20;
