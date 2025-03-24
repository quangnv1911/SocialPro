import { AxiosInstance } from 'axios';
import { PaymentQueriesResponse } from '@/api/actions/payment/payment.types';
import { queryFactoryOptions } from '@/api/utils/queryFactoryOptions';
import { UserDetailResponse } from '@/api/actions/user/user.types';

const getCurrentUser = (client: AxiosInstance) => async () => {
  return ((await client.get<UserDetailResponse>('/user/me')).data);
};

export const userQueries = {
  all: () => ['user'],
  me: (isEnabled: boolean | undefined) =>
    queryFactoryOptions({
      queryKey: [...userQueries.all(), 'me'],
      queryFn: getCurrentUser,
      enabled: isEnabled,
    }),
};
