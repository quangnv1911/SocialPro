import { AxiosInstance } from 'axios';
import { CreateOrderMutationArguments, OrderCreateResponse } from './order.types';

export const orderMutations = {
  createOrderMutation: (client: AxiosInstance) => async (body: CreateOrderMutationArguments) => {
    return (await client.post<OrderCreateResponse[]>('/order', body)).data;
  },
};
