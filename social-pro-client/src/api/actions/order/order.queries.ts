import { queryFactoryOptions } from '@/api/utils/queryFactoryOptions';
import { AxiosInstance } from 'axios';
import { CategoryResponse } from '../category/category.types';

export const orderQueries = {
  all: () => ['order'],
  getAll: () =>
    queryFactoryOptions({
      queryKey: [...orderQueries.all(), 'list'],
      queryFn: (client: AxiosInstance) => async () => (await client.get<CategoryResponse[]>('/order/list}')).data,
      keepPreviousData: true,
    }),
  getOrderDetails: () =>
    queryFactoryOptions({
      queryKey: [...orderQueries.all(), 'details'],
      queryFn: (client: AxiosInstance) => async () => (await client.get<CategoryResponse[]>('/order/details}')).data,
      keepPreviousData: true,
    }),
};
