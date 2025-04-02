'use client';
import { useEffect, useState } from 'react';

interface UsePaginationSearchProps {
  pageSizeOptions?: number[]; // Tùy chọn
  initialPage?: number; // Tùy chọn
  initialSearchTerm?: string; // Tùy chọn
}

interface UsePaginationSearchReturn {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearchTerm: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  sortOrder: 'asc' | 'desc';
  setSortOrder?: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
  setSortBy?: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
}

const usePaginationSearch = ({
  pageSizeOptions = [10, 25, 50], // Giá trị mặc định nếu không truyền
  initialPage = 1, // Giá trị mặc định nếu không truyền
  initialSearchTerm = '', // Giá trị mặc định nếu không truyền
}: UsePaginationSearchProps = {}): UsePaginationSearchReturn => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<string>('id');

  useEffect(() => {
    // Debounce thủ công với setTimeout
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms thay vì 3000ms

    // Cleanup để tránh set state sau khi component unmount
    return () => clearTimeout(handler);
  }, [searchTerm]);
  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    page,
    setPage,
    pageSize,
    setPageSize,
    sortOrder,
    setSortOrder,
    sortBy,
    setSortBy,
  };
};

export default usePaginationSearch;
