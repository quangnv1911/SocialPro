'use client';
import axios, { type AxiosError, AxiosResponse } from 'axios';
import { getStandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError';
import { ExtendedAxiosRequestConfig } from '@/api/types/types';
import { RefreshTokenMutationResponse } from '@/api/actions/auth/auth.types';
import { refreshTokenUrl } from '@/api/actions/auth/auth.mutations';
import authStore from '@/stores/authState';

export const responseSuccessInterceptor = (response: AxiosResponse) => response.data;

export const useResponseFailureInterceptor = async (error: AxiosError<unknown>) => {
  const { setAuthData, clearTokens, accessToken, refreshToken } = authStore.getState();

  const standarizedError = getStandardizedApiError(error);

  const originalRequest = error.config as ExtendedAxiosRequestConfig;
  if (standarizedError.statusCode === 401 && standarizedError.message === 'EXPIRED_TOKEN' && originalRequest?._retry) {
    clearTokens();

    window.location.replace('/login');

    return Promise.reject(standarizedError);
  }
  if (standarizedError.statusCode === 401 && originalRequest) {
    originalRequest._retry = true;
    try {
      // const { data } = await axios.post<RefreshTokenMutationResponse>(refreshTokenUrl, {
      //   accessToken: accessToken,
      //   refreshToken: refreshToken,
      // });
      //
      // setAuthData(data.accessToken ?? '', refreshToken ?? '', '', '', '', '');

      return axios(originalRequest);
    } catch {
      // clearTokens();
      window.location.replace('/login');

      return Promise.reject(standarizedError);
    }
  }
  return Promise.reject(standarizedError);
};
