'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, Package, Calendar, Hash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DURATION_LABELS, DurationEnum } from '@/utils/constants/duration';
import { BigCategory } from '@/utils/constants/bigCategory';
import { orderQueries } from '@/api/actions/order/order.queries';
import { useQuery } from '@/hooks';
import { OrderResponse } from '@/api/actions/order/order.types';
import { ApiResponse, ApiResponsePaging } from '@/types/response';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { productQueries } from '@/api/actions/product/product.queries';
import { ProductResponse } from '@/api/actions/product/product.types';

type OrderDetail = {
  id: string;
  productId?: string;
  mmoResourceId?: string;
  cronjobKey?: string;
  status: string;
  category: string;
  quantity: number;
  duration: string;
  productDetails: any[];
};

type Order = {
  id: string;
  amount: number;
  userId: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  orderDetails: OrderDetail[];
};

type OrderPagingData = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  data: Order[];
};

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: orderResponse,
    isLoading,
    isError,
  } = useQuery<ApiResponsePaging<OrderResponse>>({
    ...orderQueries.getAll({ page: 1, pageSize: 10 }),
  });

  // Query for product details when a product detail is selected
  const { data: productDetail, isLoading: isProductLoading } = useQuery<ProductResponse>({
    ...productQueries.getDetail(
      selectedDetailId && getSelectedDetail()?.productId ? getSelectedDetail()?.productId || '' : '',
    ),
    enabled: !!(selectedDetailId && getSelectedDetail()?.productId),
  });

  // Find the order by ID or get the first one if no ID is provided
  const getOrder = () => {
    if (!orderResponse?.data) return null;

    if (orderId) {
      return orderResponse.data.find((order) => order.id === orderId) || orderResponse.data.data[0];
    }

    return orderResponse.data[0];
  };

  const order = getOrder();

  // Helper function to get the selected detail
  function getSelectedDetail(): OrderDetail | undefined {
    if (!selectedDetailId || !order) return undefined;
    return order.orderDetails.find((detail) => detail.id === selectedDetailId);
  }

  // Open modal with the selected detail
  const handleOpenDetailModal = (detailId: string) => {
    setSelectedDetailId(detailId);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // if (isError || !orderResponse || !order) {
  //   return (
  //     <div className="container mx-auto py-12 text-center">
  //       <div className="mb-6 text-red-500">
  //         <span className="text-xl">Không tìm thấy thông tin đơn hàng</span>
  //       </div>
  //       <Link href="/">
  //         <Button>Quay lại trang chủ</Button>
  //       </Link>
  //     </div>
  //   );
  // }

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
              <span className="text-gray-700">
                Mã đơn hàng: <span className="font-medium">{order.id}</span>
              </span>
            </div>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-700">
                Ngày đặt: <span className="font-medium">{formatDate(order.createdAt)}</span>
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-right">
              <span className="text-gray-700">Tổng thanh toán:</span>
              <p className="text-2xl font-bold text-yellow-500">{order.amount.toLocaleString()}đ</p>
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
          <Card
            key={detail.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleOpenDetailModal(detail.id)}
          >
            <div className="flex flex-col md:flex-row">
              {/* Product Image Placeholder */}
              <div className="w-full md:w-24 h-24 relative mb-4 md:mb-0 flex-shrink-0">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-md">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-grow md:ml-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">
                      {detail.productId ? 'Sản phẩm' : detail.mmoResourceId ? 'Tài nguyên MMO' : 'Sản phẩm'}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded-md mr-2">
                        {detail.category === BigCategory.Product ? 'Sản phẩm' : 'Tài nguyên MMO'}
                      </span>
                      {detail.duration && (
                        <span className="inline-block bg-gray-100 px-2 py-1 rounded-md">
                          {DURATION_LABELS[detail.duration as keyof typeof DurationEnum] || detail.duration}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                        {detail.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 md:text-right">
                    <div className="text-sm text-gray-500">{detail.quantity} x (Xem chi tiết)</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết sản phẩm</DialogTitle>
          </DialogHeader>

          {isProductLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {productDetail && (
                <>
                  <div className="relative h-48 bg-white rounded-lg overflow-hidden border">
                    {productDetail.image ? (
                      <Image src={productDetail.image} alt={productDetail.name} fill className="object-contain p-4" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-400">Không có hình ảnh</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">{productDetail.name}</h3>
                  <p className="text-gray-700">{productDetail.description}</p>

                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Loại:</div>
                      <div className="text-sm font-medium">Sản phẩm</div>

                      <div className="text-sm text-gray-500">Thời hạn:</div>
                      <div className="text-sm font-medium">
                        {getSelectedDetail()?.duration &&
                          DURATION_LABELS[getSelectedDetail()?.duration as keyof typeof DurationEnum]}
                      </div>

                      <div className="text-sm text-gray-500">Số lượng:</div>
                      <div className="text-sm font-medium">{getSelectedDetail()?.quantity}</div>

                      <div className="text-sm text-gray-500">Trạng thái:</div>
                      <div className="text-sm font-medium">{getSelectedDetail()?.status}</div>
                    </div>
                  </div>
                </>
              )}

              {!productDetail && (
                <div className="text-center py-8 text-gray-500">Không tìm thấy thông tin chi tiết sản phẩm</div>
              )}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsModalOpen(false)}>Đóng</Button>
          </div>
        </DialogContent>
      </Dialog>

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
