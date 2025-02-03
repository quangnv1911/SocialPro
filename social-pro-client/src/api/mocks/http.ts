import { http as baseHttp, Path } from 'msw';
import { ENV } from '@/config/env';

const createRestHandler = <MethodType extends keyof typeof baseHttp>(
  method: MethodType,
): (typeof baseHttp)[MethodType] => {
  return ((...params: Parameters<(typeof baseHttp)[MethodType]>) => {
    const [path, resolver] = params;

    const url: Path = /^(?:[a-z+]+:)?\/\//i.test(path.toString()) ? path : `${ENV.BASE_URL}${path}`;

    return baseHttp[method](url, resolver);
  }) as (typeof baseHttp)[MethodType];
};

export const http = {
  head: createRestHandler('head'),
  get: createRestHandler('get'),
  post: createRestHandler('post'),
  put: createRestHandler('put'),
  delete: createRestHandler('delete'),
  patch: createRestHandler('patch'),
  options: createRestHandler('options'),
};
