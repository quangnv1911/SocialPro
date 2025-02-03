import { AxiosInstance } from 'axios';
import {
  LoginMutationArguments,
  LoginMutationResponse,
  // MUTATION_TYPE_IMPORTS
} from './auth.types';
import { ENV } from '@/config/env';

export const authMutations = {
  loginMutation: (client: AxiosInstance) => async (body: LoginMutationArguments) => {
    return (await client.post<LoginMutationResponse>('/authorize', body)).data;
  },
  // MUTATION_FUNCTIONS_SETUP
};

export const refreshTokenUrl = `${ENV.BASE_URL}/users/refresh-token`;
