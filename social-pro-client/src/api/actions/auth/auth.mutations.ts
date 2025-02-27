import { AxiosInstance } from 'axios';
import {
  LoginMutationArguments,
  LoginMutationResponse, RegisterMutationArguments,
  // MUTATION_TYPE_IMPORTS
} from './auth.types';
import { ENV } from '@/config/env';

export const authMutations = {
  loginMutation: (client: AxiosInstance) => async (body: LoginMutationArguments) => {
    return (await client.post<LoginMutationResponse>('/auth/authenticate', body)).data;
  },
  registerMutation: (client: AxiosInstance) => async (body: RegisterMutationArguments) => {
    return (await client.post<LoginMutationResponse>('/auth/register', body)).data;
  },
  // MUTATION_FUNCTIONS_SETUP
};

export const refreshTokenUrl = `${ENV.BASE_URL}/users/refresh-token`;
