"use client";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { CategoryLabel } from "@/utils/category-label";
import { Board } from "@/types/board";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface BoardListTableProps {
  boards: Board[];
  isLoading: boolean;
  onBoardClick: (boardId: number) => void;
}

const columns: ColumnDef<Board>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center w-[80px]">번호</div>,
    cell: ({ row }) => (
      <div className="text-center w-[80px]">{row.original.id}</div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center w-[120px]">카테고리</div>,
    cell: ({ row }) => (
      <div className="text-center w-[120px]">
        <CategoryLabel category={row.original.category || "ALL"} />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: () => <div className="pl-4 flex-1">제목</div>,
    cell: ({ row }) => (
      <div className="pl-4 font-medium flex-1">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-right pr-4 w-[140px] min-w-[140px] max-w-[140px]">
        작성일
      </div>
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return (
        <div className="text-right text-gray-500 text-sm pr-4 w-[140px] min-w-[140px] max-w-[140px] whitespace-nowrap">
          {date &&
            formatDistanceToNow(new Date(date), {
              addSuffix: true,
              locale: ko,
            })}
        </div>
      );
    },
  },
];

export function BoardListTable({
  boards,
  isLoading,
  onBoardClick,
}: BoardListTableProps) {
  const table = useReactTable({
    data: boards,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onBoardClick(row.original.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
