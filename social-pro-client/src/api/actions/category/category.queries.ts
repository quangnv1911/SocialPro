import { AxiosInstance } from 'axios';
import { queryFactoryOptions } from '@/api/utils/queryFactoryOptions';
import { BigCategory } from '@/utils/constants/bigCategory';
import { CategoryResponse } from './category.types';

export const categoryQueries = {
  all: () => ['category'],
  getAll: (param?: BigCategory) =>
    queryFactoryOptions({
      queryKey: [...categoryQueries.all(), 'list'],
      queryFn: (client: AxiosInstance) => async () => (await client.get<CategoryResponse[]>(`/category/list/${param}`)).data,
      keepPreviousData: true,
    }),
};
