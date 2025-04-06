'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from '@/hooks';
import { OrderCard } from '../OrderCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingBag } from 'lucide-react';
import { ApiResponsePaging } from '@/types/response';
import { OrderDetailsModal } from '../OrderDetailsModal';
import { OrderResponse } from '@/api/actions/order/order.types';
import { orderQueries } from '@/api/actions/order/order.queries';
import { PaginationWithPageSize } from '@/components/common/PaginationWithPageSize';

export const OrderList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: orderResponse,
    isLoading,
    isError,
  } = useQuery<ApiResponsePaging<OrderResponse>>({
    ...orderQueries.getAll({ page, pageSize, sortOrder: 'desc', sortBy: 'createdAt' }),
  });

  const handleOpenOrderDetails = (order: OrderResponse) => {
    setSelectedOrder(order);
    setSelectedDetailId(null);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !orderResponse?.data) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="mb-6 text-red-500">
          <span className="text-xl">Không thể tải danh sách đơn hàng</span>
        </div>
        <Link href="/">
          <Button>Quay lại trang chủ</Button>
        </Link>
      </div>
    );
  }

  const orders = orderResponse.data;
  const totalPages = orderResponse.totalPages || 1;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Đơn hàng của tôi</h1>
      </div>

      {orders?.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Bạn chưa có đơn hàng nào</h2>
            <p className="text-gray-500 mb-6">Hãy khám phá các sản phẩm và dịch vụ của chúng tôi</p>
            <Link href="/products">
              <Button>Xem sản phẩm</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onClick={() => handleOpenOrderDetails(order)} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <PaginationWithPageSize
                currentPage={page}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          )}
        </>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        order={selectedOrder}
        selectedDetailId={selectedDetailId}
        onDetailSelect={setSelectedDetailId}
      />
    </div>
  );
};
