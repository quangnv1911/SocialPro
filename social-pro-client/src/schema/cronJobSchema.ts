import { z } from 'zod';

export const cronJobSchema = z.object({
  cronLink: z.string().url('Liên kết không hợp lệ'),
  interval: z.number().min(10, 'Vòng lặp tối thiểu 10 giây').max(86400, 'Vòng lặp tối đa 1 ngày'),
  method: z.enum(['GET', 'POST'], {
    errorMap: () => ({ message: 'Vui lòng chọn phương thức' }),
  }),
  duration: z.number().min(1, 'Thời hạn tối thiểu 1 tháng').max(12, 'Thời hạn tối đa 12 tháng'),
});


export type CronJobFormValues = z.infer<typeof cronJobSchema>;