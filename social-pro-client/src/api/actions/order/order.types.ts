import { BigCategory } from '@/utils/constants/bigCategory';
import { DurationEnum } from '@/utils/constants/duration';

export type CreateOrderMutationArguments = {
  orderDetails: OrderDetail[];
};

export type OrderDetail = {
  category: BigCategory;
  productId?: string;
  mmoResourceId?: string;
  duration?: DurationEnum;
  quantity?: number;
};

export type OrderCreateResponse = {
  orderId: string;
};
