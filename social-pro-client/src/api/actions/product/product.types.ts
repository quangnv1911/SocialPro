import { BasePagingFilter } from '@/types/requests';
import { DurationEnum } from '@/utils/constants/duration';
import { ProductStatusEnum } from '@/utils/constants/productStatus';
export type ProductQueriesRequest = BasePagingFilter & {
  name: string;
  categoryId?: string;
};

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  image: string;
  createdAt: string;
  durations: ProductDurationResponse[];
};

export type ProductDurationResponse = {
  id: string;
  duration: DurationEnum;
  price: number;
};

export type ProductDetailResponse = {
  id: string;
  data: string;
  duration: DurationEnum;
  status: ProductStatusEnum;
};
