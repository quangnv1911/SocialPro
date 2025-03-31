'use client';

import { FC, ReactElement } from 'react';
import { useCartStore } from '@/stores/cartStore';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { DURATION_LABELS, DurationEnum } from '@/utils/constants/duration';
import { Separator } from '@/components/ui/separator';
import userStore from '@/stores/userStore';
import { toast } from 'react-toastify';
import { useMutation } from '@/hooks';
import { CreateOrderMutationArguments, OrderCreateResponse } from '@/api/actions/order/order.types';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { BigCategory } from '@/utils/constants/bigCategory';

const CartPage: FC = (): ReactElement => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const { user } = userStore();

  const { mutateAsync: createOrder, isPending: isOrdering } = useMutation('createOrderMutation', {
    onSuccess: () => {
      toast.success('Đặt hàng thành công');
    },
    onError: (error: StandardizedApiError) => {
      toast.error((error.data as { message?: string })?.message ?? 'Đặt hàng thất bại ');
    },
  });
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if ((user?.money ?? 0) < totalPrice) {
      toast.error('Bạn không có đủ tiền để thanh toán');
      return; // Add return to prevent proceeding with checkout
    }

    const newOrder: CreateOrderMutationArguments = {
      orderDetails: items.map((item) => ({
        category: item.category, // Add required category field
        productId: item.category === BigCategory.Product ? item.product?.id : undefined,
        mmoResourceId: item.category === BigCategory.Product ? item.mmoResource?.id : undefined,
        price: item.price,
        duration: item.duration,
        quantity: item.quantity,
      })),
    };

    createOrder(newOrder).then(() => {
      clearCart(); // Clear cart after successful order
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
        <div className="bg-white rounded-lg shadow-sm p-12">
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-gray-500 mb-6">Giỏ hàng của bạn đang trống</p>
            <Link href="/products">
              <Button>Tiếp tục mua sắm</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Sản phẩm</h2>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa tất cả
                </Button>
              </div>

              {items.map((item) => (
                <div key={`${item.product.id}-${item.duration}`} className="border-t py-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      {item.product.image ? (
                        <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">Thời hạn: {DURATION_LABELS[item.duration]}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-medium">{(item.price * item.quantity).toLocaleString()}đ</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="font-medium mb-4">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span>{totalPrice.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giảm giá</span>
                <span>0đ</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-medium mb-6">
              <span>Tổng cộng</span>
              <span className="text-lg">{totalPrice.toLocaleString()}đ</span>
            </div>

            <Button className="w-full bg-yellow-500 hover:bg-yellow-600" onClick={handleCheckout}>
              Tiến hành thanh toán
            </Button>

            <div className="mt-4">
              <Link href="/products" className="text-sm text-center block text-yellow-600 hover:underline">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
