/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useQuery } from '@/hooks';
import { productQueries } from '@/api/actions/product/product.queries';
import { ProductResponse } from '@/api/actions/product/product.types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderDetailContent } from '../OrderDetailContent';
import { ProductDetailModal } from '../ProductDetailModal';
import { formatDate } from '../utils';
import { OrderDetail, OrderResponse } from '@/api/actions/order/order.types';
import { Package } from 'lucide-react';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderResponse | null;
  selectedDetailId: string | null;
  onDetailSelect: (detailId: string) => void;
}

export const OrderDetailsModal = ({
  isOpen,
  onOpenChange,
  order,
  selectedDetailId,
  onDetailSelect,
}: OrderDetailsModalProps) => {
  const [selectedProductDetail, setSelectedProductDetail] = useState<ProductResponse | null>(null);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);

  // Helper function to get the selected detail
  function getSelectedDetail(): OrderDetail | undefined {
    if (!selectedDetailId || !order) return undefined;
    return order.orderDetails.find((detail) => detail.id === selectedDetailId);
  }

  // Query for product details when a product detail is selected
  const { data: productDetail, isLoading: isProductLoading } = useQuery<ProductResponse>({
    ...productQueries.getDetail(
      selectedDetailId && getSelectedDetail()?.productId ? getSelectedDetail()?.productId || '' : '',
    ),
    enabled: !!(selectedDetailId && getSelectedDetail()?.productId),
  });

  const handleOpenProductDetail = (productDetail: ProductResponse) => {
    setSelectedProductDetail(productDetail);
    setIsProductDetailModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>

          {order && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Mã đơn hàng</div>
                    <div className="font-medium">{order.id.substring(0, 12)}...</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Ngày đặt</div>
                    <div className="font-medium">{formatDate(order.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Số lượng sản phẩm</div>
                    <div className="font-medium">{order.orderDetails.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Tổng tiền</div>
                    <div className="font-medium text-yellow-500">{order.amount.toLocaleString()}đ</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Details */}
              <div>
                <h3 className="text-lg font-medium mb-4">Sản phẩm trong đơn hàng</h3>

                <Tabs defaultValue={selectedDetailId ?? order.orderDetails[0]?.id} onValueChange={onDetailSelect}>
                  <TabsList className="mb-4 flex flex-wrap">
                    {order.orderDetails.map((detail, index) => (
                      <TabsTrigger key={detail.id} value={detail.id ?? ''} className="mb-1">
                        <span className="flex items-center">
                          <Package className="h-3 w-3 mr-1" />
                          Sản phẩm {index + 1}
                          {detail.productDetails && detail.productDetails.length > 0 && (
                            <span className="ml-1 text-xs bg-gray-100 px-1 rounded-full">
                              {detail?.productDetails?.length}
                            </span>
                          )}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {order.orderDetails.map((detail) => (
                    <TabsContent key={detail.id} value={detail.id ?? ''}>
                      <OrderDetailContent
                        detail={detail}
                        productDetail={productDetail}
                        isProductLoading={isProductLoading}
                        onOpenProductDetail={handleOpenProductDetail}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button onClick={() => onOpenChange(false)}>Đóng</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isProductDetailModalOpen}
        onOpenChange={setIsProductDetailModalOpen}
        productDetail={selectedProductDetail}
      />
    </>
  );
};
