export interface Board {
  id: number;
  title: string;
  content: string;
  boardCategory: BoardCategory;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  author?: {
    id: number;
    name: string;
  };
  category?: BoardCategory;
}

export interface BoardAllResponse {
  id: number;
  title: string;
  content: string;
  category: BoardCategory;
  createdAt: string;
  imageUrl?: string;
}

export type BoardCategory = "NOTICE" | "FREE" | "QNA" | "ETC" | "ALL";

interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface BoardListResponse {
  content: Board[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}

export interface CreateBoardDto {
  title: string;
  content: string;
  category: BoardCategory;
  file?: File;
}

export interface UpdateBoardDto extends CreateBoardDto {}
