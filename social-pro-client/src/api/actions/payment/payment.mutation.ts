import { AxiosInstance } from 'axios';
import { GeneratePaymentMutationArguments, GeneratePaymentMutationResponse } from '@/api/actions/payment/payment.types';

export const paymentMutation = {
  generatePayment: (client: AxiosInstance) => async (body: GeneratePaymentMutationArguments) => {
    return (await client.post<GeneratePaymentMutationResponse>('/payment/generate', body)).data;
  },
  // MUTATION_FUNCTIONS_SETUP
};