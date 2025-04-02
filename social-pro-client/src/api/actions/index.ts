import { authMutations } from './auth/auth.mutations';
import { paymentMutation } from '@/api/actions/payment/payment.mutation';
import { cronJobMutations } from '@/api/actions/cron-job/cron-job.mutations';
import { orderMutations } from './order/order.mutations';

export const mutations = {
  ...authMutations,
  ...paymentMutation,
  ...cronJobMutations,
  ...orderMutations,
  // API_COLLECTION_MUTATIONS
} as const;

export type AxiosMutationsType = typeof mutations;
