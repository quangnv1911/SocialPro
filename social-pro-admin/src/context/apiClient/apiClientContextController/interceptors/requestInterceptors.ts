import { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import authStore from '@/stores/authState';

export const requestSuccessInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const { accessToken } = authStore();
  if (!accessToken) {
    return config;
  }

  return {
    ...config,
    withCredentials: false,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders,
  };
};
