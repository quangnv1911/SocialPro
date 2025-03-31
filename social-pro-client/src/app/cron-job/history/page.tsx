import { FC, ReactNode } from 'react';
import { JobHistoryTable } from '@/components/features/cron-job/cron-job-table';

const CronJobHistoryPage: FC = (): ReactNode => {
  return <JobHistoryTable />;
};

export default CronJobHistoryPage;