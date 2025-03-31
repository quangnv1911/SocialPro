import { BasePagingFilter } from '@/types/requests';

export type CronJobResponse = {
  name: string;
  cronUrl: string;
  intervalSeconds: string;
  method: string;
  duration: string;
  lastSchedule: string;
  createdTime: string;
}

export type CronJobMutationArguments = {
  cronUrl: string
  intervalSeconds: number
  method: string
  duration: number
}

export type CronJobQueriesRequest = BasePagingFilter & {
  name: string
}