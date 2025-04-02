import { AxiosInstance } from 'axios';
import {
  LoginMutationArguments,
  LoginMutationResponse,
  LogoutMutationRequest,
  RegisterMutationArguments,
  VerifyAccountMutationRequest,
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
  logoutMutation: (client: AxiosInstance) => async (body: LogoutMutationRequest) => {
    return (await client.post<void>('/auth/logout', body)).data;
  },
  verifyAccountMutation: (client: AxiosInstance) => async (body: VerifyAccountMutationRequest) => {
    return (await client.post<void>('/auth/verify-account', body)).data;
  },
  // MUTATION_FUNCTIONS_SETUP
};

export const refreshTokenUrl = `${ENV.BASE_URL}/users/refresh-token`;
