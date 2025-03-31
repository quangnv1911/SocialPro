'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Image from 'next/image';
import { useQuery } from '@/hooks';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FC, ReactElement, useState } from 'react';
import { ApiResponsePaging } from '@/types/response';
import EmptyIcon from '@/components/common/emptyIcon';
import usePaginationSearch from '@/hooks/pagingFilter';
import { BigCategory } from '@/utils/constants/bigCategory';
import { ProductResponse } from '@/api/actions/product/product.types';
import { productQueries } from '@/api/actions/product/product.queries';
import { CategoryResponse } from '@/api/actions/category/category.types';
import { categoryQueries } from '@/api/actions/category/category.queries';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const ProductsPage: FC = (): ReactElement => {
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const { searchTerm, setSearchTerm, debouncedSearchTerm, page, setPage, pageSize, setPageSize, sortBy, sortOrder } =
    usePaginationSearch();

  const { data: categories } = useQuery<CategoryResponse[]>({
    ...categoryQueries.getAll(BigCategory.Product),
  });
  // Fetch products with React Query
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ApiResponsePaging<ProductResponse>>({
    ...productQueries.getAll({ name: debouncedSearchTerm, categoryId, page, pageSize, sortBy, sortOrder }),
  });

  if (isError) {
    return <div className="container mx-auto py-8">Có lỗi hiển thị</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Tài khoản giá rẻ</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Tìm kiếm tài khoản..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="w-full md:w-48">
          {/* <Select
            value={filters.category}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        <div className="w-full md:w-48">
          <Select
            value={categoryId}
            onValueChange={(value: string) => {
              if (value === 'all') {
                setCategoryId(undefined);
              } else {
                setCategoryId(value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Phân loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : products?.data.length === 0 ? (
        <EmptyIcon emptyEntity="Sản phẩm" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.data.map((product: ProductResponse) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="h-48 bg-gray-100 relative">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 line-clamp-2">{product.description}</p>
                  <p className="text-lg font-bold mt-2">{product.price} vnd</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => router.push(`/products/${product.id}`)}>
                    Xem chi tiết
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {products && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
                      className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>

                  {Array.from({ length: products.totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    // Hiển thị trang hiện tại và các trang lân cận
                    if (
                      pageNumber === 1 ||
                      pageNumber === products.totalPages ||
                      (pageNumber >= page - 1 && pageNumber <= page + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber} className={'hover:cursor-pointer'}>
                          <PaginationLink isActive={pageNumber === page} onClick={() => setPage(pageNumber)}>
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    // Hiển thị dấu ... nếu có khoảng cách
                    if (
                      (pageNumber === 2 && page > 3) ||
                      (pageNumber === products.totalPages - 1 && page < products.totalPages - 2)
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
                      onClick={() => setPage((prev) => Math.min(prev + 1, products.totalPages))}
                      className={page === products.totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Số mục mỗi trang:</span>
                <Select onValueChange={(value) => setPageSize(Number(value))} defaultValue={pageSize.toString()}>
                  <SelectTrigger className="w-20">
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
