import { queryFactoryOptions } from '@/api/utils/queryFactoryOptions';
import { AxiosInstance } from 'axios';
import { CategoryResponse } from '../category/category.types';
import { OrderFilterRequest, OrderResponse } from './order.types';
import { stringify } from 'qs';
import { ApiResponsePaging } from '@/types/response';

const getAllOrders = (client: AxiosInstance, requestParam?: OrderFilterRequest) => async () => {
  const queryParams: string = stringify(requestParam, { addQueryPrefix: true });
  return (await client.get<ApiResponsePaging<OrderResponse>>(`/order${queryParams}`)).data;
};

export const orderQueries = {
  all: () => ['order'],
  getAll: (requestParam?: OrderFilterRequest) =>
    queryFactoryOptions({
      queryKey: [...orderQueries.all(), 'list'],
      queryFn: (client: AxiosInstance) => getAllOrders(client, requestParam),
      keepPreviousData: true,
    }),
  getOrderDetails: () =>
    queryFactoryOptions({
      queryKey: [...orderQueries.all(), 'details'],
      queryFn: (client: AxiosInstance) => async () => (await client.get<CategoryResponse[]>('/order/details}')).data,
      keepPreviousData: true,
    }),
};
