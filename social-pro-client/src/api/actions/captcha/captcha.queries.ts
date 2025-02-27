import { AxiosInstance } from 'axios';
import { CaptchaResponse } from '@/api/actions/captcha/captcha.types';
import { queryFactoryOptions } from '@/api/utils/queryFactoryOptions';

const getNewCaptcha = (client: AxiosInstance) => async () => {
  return ((await client.get<CaptchaResponse>('/captcha')).data);
};

export const captchaQueries = {
  all: () => ['captcha'],
  get: () =>
    queryFactoryOptions({
      queryKey: [...captchaQueries.all(), 'get'],
      queryFn: getNewCaptcha,
      enabled: false,
    }),
};
