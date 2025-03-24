export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp: number;
}

export interface ApiResponsePaging<T> {
  currentPage: number
  totalPages: number
  pageSize: number
  totalElements: number
  data: T[]
}