import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default function BoardItem({ board }: { board: any }) {
  const timeAgo = formatDistanceToNow(new Date(board.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="p-4 border-b hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {board.category === "NOTICE" && (
            <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded">
              공지
            </span>
          )}
          <h3 className="text-lg font-medium">
            <a href={`/boards/${board.id}`} className="hover:text-blue-600">
              {board.title}
            </a>
          </h3>
        </div>
        <span className="text-sm text-gray-500">{timeAgo}</span>
      </div>
    </div>
  );
}
