import { BasePagingFilter } from '@/types/requests';
import { BigCategory } from '@/utils/constants/bigCategory';
import { DurationEnum } from '@/utils/constants/duration';
import { ProductDetailResponse } from '../product/product.types';
import { OrderStatusEnum } from '@/utils/constants/orderDetailStatus';

export type CreateOrderMutationArguments = {
  orderDetails: OrderDetail[];
};

export type OrderDetail = {
  id?: string;
  category: BigCategory;
  productId?: string;
  mmoResourceId?: string;
  duration?: DurationEnum;
  quantity?: number;
  status?: OrderStatusEnum;
  productDetails?: ProductDetailResponse[];
};

export type OrderCreateResponse = {
  orderId: string;
};

export type OrderFilterRequest = BasePagingFilter & {
  name?: string;
};

export type OrderResponse = {
  id: string;
  orderDetails: OrderDetail[];
  userId: string;
  category: BigCategory;
  createdAt: string;
  updatedAt: string;
  amount: number;
};
