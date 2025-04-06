'use client';
import { FC, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Edit, MoreHorizontal, Pause, Play, Search, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useQuery } from '@/hooks';
import { ApiResponsePaging } from '@/types/response';
import { CronJobResponse } from '@/api/actions/cron-job/cron-job.types';
import { cronJobQueries } from '@/api/actions/cron-job/cron-job.queries';
import usePaginationSearch from '@/hooks/pagingFilter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Chuyển đổi phút sang định dạng dễ đọc
const formatInterval = (minutes: string) => {
  const mins = Number.parseInt(minutes);
  if (mins < 60) return `${mins} phút`;
  if (mins === 60) return '1 giờ';
  if (mins < 1440) return `${mins / 60} giờ`;
  if (mins === 1440) return '1 ngày';
  if (mins === 10080) return '1 tuần';
  return `${mins / 1440} ngày`;
};


export const JobHistoryTable: FC = (): ReactNode => {
  const router: AppRouterInstance = useRouter();

  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    page,
    setPage,
    pageSize,
    setPageSize,
    sortBy,
    sortOrder,
  } = usePaginationSearch();

  const { data: cronJobList, isLoading } = useQuery<ApiResponsePaging<CronJobResponse>>({
    ...cronJobQueries.getAll({
      name: debouncedSearchTerm,
      page,
      pageSize,
      sortBy,
      sortOrder,
    }),
  });

  if (!cronJobList) return null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-0 shadow-sm">
        <CardHeader className="bg-yellow-500 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold">Danh sách Job CRON</CardTitle>
              <CardDescription className="text-yellow-50 mt-1">Quản lý các job CRON đã được tạo</CardDescription>
            </div>
            <Button className="bg-white text-yellow-500 hover:bg-yellow-50" onClick={() => router.push('/cron-job')}>
              + THÊM LINK CRON
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                className="pl-8 border-gray-300 focus-visible:ring-yellow-500 focus-visible:border-yellow-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <Button variant="outline" className="ml-4 border-yellow-500 text-yellow-500 hover:bg-yellow-50" onClick={() => {
            }}>
              <Clock className="mr-2 h-4 w-4" />
              Tìm kiếm
            </Button>
          </div>

          <div className="rounded-md border">
            <Table className={`relative transition-opacity duration-300 ${isLoading ? 'opacity-50' : ''}`}>
              <TableHeader className="bg-yellow-50">
                <TableRow>
                  <TableHead className="w-[50px] text-center">#</TableHead>
                  <TableHead className="w-[50px] text-center">Tên</TableHead>
                  <TableHead>Liên kết CRON</TableHead>
                  <TableHead className="w-[100px]">Phương thức</TableHead>
                  <TableHead className="w-[120px]">Vòng lặp</TableHead>
                  <TableHead className="w-[120px]">Trạng thái</TableHead>
                  <TableHead className="w-[120px]">Ngày tạo</TableHead>
                  <TableHead className="w-[120px]">Lần chạy cuối</TableHead>
                  <TableHead className="w-[80px] text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cronJobList?.data?.length > 0 ? (
                  cronJobList.data.map((job: CronJobResponse, index: number) => (
                    <TableRow key={job.name}>
                      <TableCell className="text-center font-medium">
                        {(page - 1) * pageSize + index + 1} {/* Tính số thứ tự */}
                      </TableCell>
                      <TableCell className="text-center font-medium">{job.name}</TableCell>
                      <TableCell className="font-medium truncate max-w-[200px]">{job.cronUrl}</TableCell>
                      <TableCell>{job.method}</TableCell>
                      <TableCell>{formatInterval(job.intervalSeconds)}</TableCell>
                      <TableCell>
                        <Badge className={`${job.createdTime} text-white`}>
                          {job.createdTime}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(job.createdTime, 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{format(job.lastSchedule, 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Chỉnh sửa</span>
                            </DropdownMenuItem>
                            {job.createdTime === 'active' ? (
                              <DropdownMenuItem className="cursor-pointer">
                                <Pause className="mr-2 h-4 w-4" />
                                <span>Tạm dừng</span>
                              </DropdownMenuItem>
                            ) : job.createdTime === 'paused' ? (
                              <DropdownMenuItem className="cursor-pointer">
                                <Play className="mr-2 h-4 w-4" />
                                <span>Kích hoạt</span>
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem className="cursor-pointer text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Xóa</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Không tìm thấy kết quả nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-evenly border-t p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
                  className={`${page === 1 ? 'pointer-events-none opacity-50' : ''} hover:text-yellow-500`}
                />
              </PaginationItem>

              {Array.from({ length: cronJobList.totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                // Hiển thị trang hiện tại và các trang lân cận
                if (
                  pageNumber === 1 ||
                  pageNumber === cronJobList.totalPages ||
                  (pageNumber >= page - 1 && pageNumber <= page + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber} className={'hover:cursor-pointer'}>
                      <PaginationLink 
                        isActive={pageNumber === page} 
                        onClick={() => setPage(pageNumber)}
                        className={pageNumber === page ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'hover:text-yellow-500'}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                // Hiển thị dấu ... nếu có khoảng cách
                if (
                  (pageNumber === 2 && page > 3) ||
                  (pageNumber === cronJobList.totalPages - 1 && page < cronJobList.totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((prev) => Math.min(prev + 1, cronJobList.totalPages))}
                  className={`${page === cronJobList.totalPages ? 'pointer-events-none opacity-50' : ''} hover:text-yellow-500`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Số mục mỗi trang:</span>
            <Select onValueChange={(value) => setPageSize(Number(value))} defaultValue={pageSize.toString()}>
              <SelectTrigger className="w-20 focus:ring-yellow-500 border-gray-300">
                <SelectValue placeholder="Chọn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

