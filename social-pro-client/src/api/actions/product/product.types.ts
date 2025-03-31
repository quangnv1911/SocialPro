import { BasePagingFilter } from '@/types/requests';
import { DurationEnum } from '@/utils/constants/duration';
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
