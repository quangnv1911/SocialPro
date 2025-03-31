import { AxiosInstance } from 'axios';
import { CronJobMutationArguments, CronJobResponse } from '@/api/actions/cron-job/cron-job.types';

export const cronJobMutations = {
  addMutation: (client: AxiosInstance) => async (body: CronJobMutationArguments) => {
    return (await client.post<CronJobResponse>('/job/schedule', body)).data;
  },
};