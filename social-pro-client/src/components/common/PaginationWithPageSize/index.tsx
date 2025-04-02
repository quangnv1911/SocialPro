/* eslint-disable no-unused-vars */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomPagination } from '../CustomPagination';

interface PaginationWithPageSizeProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export const PaginationWithPageSize = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: PaginationWithPageSizeProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Số mục mỗi trang:</span>
        <Select onValueChange={(value) => onPageSizeChange(Number(value))} defaultValue={pageSize.toString()}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Chọn" />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};