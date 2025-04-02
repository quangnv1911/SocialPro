import { stringify } from 'qs';
import { AxiosInstance } from 'axios';
import { ApiResponsePaging } from '@/types/response';
import { queryFactoryOptions } from '@/api/utils/queryFactoryOptions';
import { ProductQueriesRequest, ProductResponse } from './product.types';

const getAllProducts = (client: AxiosInstance, requestParam: ProductQueriesRequest) => async () => {
  const queryParams: string = stringify(requestParam, { addQueryPrefix: true });
  return (await client.get<ApiResponsePaging<ProductResponse>>(`/product/${queryParams}`)).data;
};

export const productQueries = {
  all: () => ['product'],
  getAll: (requestParam: ProductQueriesRequest) =>
    queryFactoryOptions({
      queryKey: [...productQueries.all(), 'getAll', requestParam],
      queryFn: (client: AxiosInstance) => getAllProducts(client, requestParam),
      keepPreviousData: true,
    }),
  getDetail: (id: string | undefined) =>
    queryFactoryOptions({
      queryKey: [...productQueries.all(), 'getDetail', id],
      queryFn: (client: AxiosInstance) => async () => (await client.get<ProductResponse>(`/product/${id}`)).data,
      enabled: !!id,
      keepPreviousData: true,
    }),
};
