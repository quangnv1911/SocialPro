import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Loader2, Search } from 'lucide-react';
import { DURATION_LABELS, DurationEnum } from '@/utils/constants/duration';
import { BigCategory } from '@/utils/constants/bigCategory';
import { ProductResponse } from '@/api/actions/product/product.types';
import { getStatusColor } from '../utils';
import { OrderDetail } from '@/api/actions/order/order.types';

interface OrderDetailContentProps {
  detail: OrderDetail;
  productDetail: ProductResponse | undefined;
  isProductLoading: boolean;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onOpenProductDetail: (productDetail: any) => void;
}

export const OrderDetailContent = ({
  detail,
  productDetail,
  isProductLoading,
  onOpenProductDetail,
}: OrderDetailContentProps) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col">
        {/* Product Details Header */}
        <div className="flex justify-between mb-4">
          <div>
            <h4 className="font-medium">
              {detail.productId ? 'Sản phẩm' : detail.mmoResourceId ? 'Tài nguyên MMO' : 'Sản phẩm'}
            </h4>
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
          </div>
          <div>
            <span className={`inline-block px-2 py-1 rounded-md ${detail.status ? getStatusColor(detail.status) : ''}`}>
              {detail.status}
            </span>
          </div>
        </div>

        {/* Main Product Info */}
        {isProductLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {productDetail && detail.productId === productDetail.id && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative h-48 bg-white rounded-lg overflow-hidden border">
                  {productDetail.image ? (
                    <Image src={productDetail.image} alt={productDetail.name} fill className="object-contain p-4" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">Không có hình ảnh</span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold">{productDetail.name}</h3>
                  <p className="text-gray-700 text-sm mt-2">{productDetail.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-500">Số lượng:</div>
                    <div className="text-sm font-medium">{detail.quantity}</div>

                    <div className="text-sm text-gray-500">Thời hạn:</div>
                    <div className="text-sm font-medium">
                      {detail.duration && DURATION_LABELS[detail.duration as keyof typeof DurationEnum]}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!productDetail && detail.productId && (
              <div className="text-center py-4 text-gray-500">Đang tải thông tin chi tiết sản phẩm...</div>
            )}
          </>
        )}

        {/* Product Details Section */}
        {detail.productDetails && detail.productDetails.length > 0 && (
          <div className="mt-6">
            <h5 className="font-medium text-sm text-gray-700 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Chi tiết sản phẩm ({detail.productDetails?.length})
            </h5>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="space-y-3">
                {detail.productDetails.map((productDetail, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
                    onClick={() => onOpenProductDetail(productDetail)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-sm">Chi tiết #{idx + 1}</div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
