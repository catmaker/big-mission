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
    accessorKey: "category",
    header: () => (
      <div className="text-left w-[100px] pl-4">카테고리</div>
    ),
    cell: ({ row }) => (
      <div className="text-left pl-4">
        <CategoryLabel category={row.original.category || "ALL"} />
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "title",
    header: () => <div className="text-left">제목</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium truncate">
        {row.original.title}
      </div>
    ),
    size: 1200,
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-right">작성일</div>
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return (
        <div className="text-right text-gray-500 text-sm whitespace-nowrap">
          {date &&
            formatDistanceToNow(new Date(date), {
              addSuffix: true,
              locale: ko,
            })}
        </div>
      );
    },
    size: 120,
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
    <Table className="w-full table-fixed">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead 
                key={header.id}
                className={
                  header.column.id === "createdAt" 
                    ? "text-right pr-6" 
                    : header.column.id === "category"
                    ? "pl-6"
                    : ""
                }
              >
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
              <TableCell 
                key={cell.id}
                className={
                  cell.column.id === "createdAt" 
                    ? "text-right pr-6" 
                    : cell.column.id === "category"
                    ? "pl-6"
                    : ""
                }
              >
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
