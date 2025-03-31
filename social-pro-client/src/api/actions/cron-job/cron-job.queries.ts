import { AxiosInstance } from 'axios';
import { queryFactoryOptions } from '@/api/utils/queryFactoryOptions';
import { CronJobQueriesRequest, CronJobResponse } from '@/api/actions/cron-job/cron-job.types';
import { stringify } from 'qs';
import { ApiResponsePaging } from '@/types/response';

const getAllCronJob = (client: AxiosInstance, requestParam: CronJobQueriesRequest) => async () => {
  const queryParams: string = stringify(requestParam, { addQueryPrefix: true });
  return (await client.get<ApiResponsePaging<CronJobResponse>>(`/job/${queryParams}`)).data;
};

export const cronJobQueries = {
  all: () => ['cron-job'],
  getAll: (requestParam: CronJobQueriesRequest) =>
    queryFactoryOptions({
      queryKey: [...cronJobQueries.all(), 'getAll', requestParam],
      queryFn: (client: AxiosInstance) => getAllCronJob(client, requestParam),
      keepPreviousData: true,
    }),
};
