import { authMutations } from './auth/auth.mutations';
import { paymentMutation } from '@/api/actions/payment/payment.mutation';

export const mutations = {
  ...authMutations,
  ...paymentMutation,
  // API_COLLECTION_MUTATIONS
} as const;

export type AxiosMutationsType = typeof mutations;
