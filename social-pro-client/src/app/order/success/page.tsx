'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, Package, Calendar, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DURATION_LABELS } from '@/utils/constants/duration';
import { BigCategory } from '@/utils/constants/bigCategory';
import { orderQueries } from '@/api/actions/order/order.queries';
import { useQuery } from '@/hooks';

type OrderSuccessDetail = {
  id: string;
  category: BigCategory;
  productName?: string;
  mmoResourceName?: string;
  duration?: number;
  quantity: number;
  price: number;
  image?: string;
};

type OrderSuccessResponse = {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  orderDetails: OrderSuccessDetail[];
};

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<OrderSuccessResponse>({
    ...orderQueries.getOrderDetails(orderId || ''),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="mb-6 text-red-500">
          <span className="text-xl">Không tìm thấy thông tin đơn hàng</span>
        </div>
        <Link href="/">
          <Button>Quay lại trang chủ</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="container mx-auto py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã đặt hàng. Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn.
        </p>
      </div>

      {/* Order Summary */}
      <Card className="mb-8 p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Thông tin đơn hàng</h2>
            <div className="flex items-center mt-2">
              <Hash className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-700">Mã đơn hàng: <span className="font-medium">{order.orderNumber}</span></span>
            </div>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-700">Ngày đặt: <span className="font-medium">{formatDate(order.createdAt)}</span></span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-right">
              <span className="text-gray-700">Tổng thanh toán:</span>
              <p className="text-2xl font-bold text-yellow-500">{order.totalAmount.toLocaleString()}đ</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Order Details */}
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Package className="h-5 w-5 mr-2" />
        Chi tiết đơn hàng
      </h2>

      <div className="space-y-4">
        {order.orderDetails.map((detail) => (
          <Card key={detail.id} className="p-4">
            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="w-full md:w-24 h-24 relative mb-4 md:mb-0 flex-shrink-0">
                {detail.image ? (
                  <Image
                    src={detail.image}
                    alt={detail.productName || detail.mmoResourceName || 'Product'}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-md">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-grow md:ml-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">
                      {detail.productName || detail.mmoResourceName || 'Sản phẩm'}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded-md mr-2">
                        {detail.category === BigCategory.Product ? 'Sản phẩm' : 'Tài nguyên MMO'}
                      </span>
                      {detail.duration && (
                        <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">
                          {DURATION_LABELS[detail.duration] || `${detail.duration} tháng`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 md:text-right">
                    <div className="text-sm text-gray-500">
                      {detail.quantity} x {detail.price.toLocaleString()}đ
                    </div>
                    <div className="font-semibold">
                      {(detail.quantity * detail.price).toLocaleString()}đ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/">
          <Button variant="outline">Tiếp tục mua sắm</Button>
        </Link>
        <Link href="/account/orders">
          <Button>Xem đơn hàng của tôi</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;