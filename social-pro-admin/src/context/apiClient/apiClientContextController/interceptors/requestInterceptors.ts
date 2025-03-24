'use client';
import { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import authStore from '@/stores/authState';
import _ from 'lodash';

export const requestSuccessInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const { accessToken } = authStore.getState();

  // Kiểm tra nếu method là POST, PUT, PATCH và có data
  if (_.includes(['post', 'put', 'patch'], _.toLower(config.method)) && _.has(config, 'data')) {
    config.data = {
      data: _.get(config, 'data', {}), // Lấy data hiện tại, mặc định là {}
      timestamp: Math.floor(Date.now() / 1000),
    };
  }
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
