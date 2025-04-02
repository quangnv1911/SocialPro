import { AxiosInstance } from 'axios';
import { queryFactoryOptions } from '@/api/utils/queryFactoryOptions';
import { PaymentQueriesRequest, PaymentQueriesResponse } from '@/api/actions/payment/payment.types';
import { stringify } from 'qs';
import { ApiResponsePaging } from '@/types/response';

const getAllPayments = (client: AxiosInstance, requestParam: PaymentQueriesRequest) => async () => {
  const queryParams: string = stringify(requestParam, { addQueryPrefix: true });
  return ((await client.get<ApiResponsePaging<PaymentQueriesResponse>>(`/payment/${queryParams}`)).data);
};

export const paymentQueries = {
  all: () => ['payment'],
  get: (requestParam: PaymentQueriesRequest) =>
    queryFactoryOptions({
      queryKey: [...paymentQueries.all(), 'get', requestParam],
      queryFn: (client: AxiosInstance) => getAllPayments(client, requestParam),
    }),
};
