'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Plus, ShoppingCart } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FC, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CronJobFormValues, cronJobSchema } from '@/schema/cronJobSchema';
import { useMutation } from '@/hooks';
import { toast } from 'react-toastify';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { CronJobMutationArguments } from '@/api/actions/cron-job/cron-job.types';

export const CronJobAddForm: FC = (): ReactElement => {
  const router: AppRouterInstance = useRouter();

  const { mutateAsync: createJob } = useMutation('addMutation', {
    onSuccess: () => {
      toast.success('Tạo job thành công');
    },
    onError: (error: StandardizedApiError) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CronJobFormValues>({
    resolver: zodResolver(cronJobSchema),
    defaultValues: {
      cronLink: '',
      interval: 60,
      method: 'GET',
    },
  });

  const onSubmit = async (data: CronJobFormValues) => {
    const newJob: CronJobMutationArguments = {
      cronUrl: data.cronLink,
      intervalSeconds: data.interval,
      method: data.method,
      duration: data.duration,
    };
    await createJob(newJob);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel */}
          <Card className="border-0 shadow-md">
            {/* Header */}
            <div className="bg-orange-500 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="flex items-center gap-2 text-white">
                <Plus className="h-5 w-5" />
                THÊM LINK CRON
              </h2>
              <Button
                variant="outline"
                className="bg-white text-orange-500 hover:bg-orange-50 border-white flex items-center gap-2"
                onClick={() => router.push('/cron-job/history')}
              >
                <Clock className="h-5 w-5" />
                LỊCH SỬ CRON
              </Button>
            </div>

            <CardContent className="p-0">
              {/* Configuration Section */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-orange-500 mb-4">Cấu hình</h3>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cronLink">
                      Liên kết cần CRON <span className="text-red-500">(*)</span>
                    </Label>
                    <Input id="cronLink" {...register('cronLink')} />
                    {errors.cronLink && <p className="text-red-500">{errors.cronLink.message}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="interval">
                      Vòng lặp <span className="text-red-500">(*)</span>
                    </Label>
                    <div className="flex">
                      <Input
                        id="interval"
                        type="number"
                        {...register('interval', { valueAsNumber: true })}
                        className="rounded-r-none"
                      />
                      <div className="bg-gray-100 px-4 flex items-center border border-l-0 rounded-r-md">giây</div>
                    </div>
                    {errors.interval && <p className="text-red-500">{errors.interval.message}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="method">
                      Phương thức <span className="text-red-500">(*)</span>
                    </Label>
                    <Select
                      onValueChange={(value) => setValue('method', value as 'GET' | 'POST')}
                      defaultValue={watch('method')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phương thức" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.method && <p className="text-red-500">{errors.method.message}</p>}
                  </div>
                </div>
              </div>

              {/* Server Section */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-orange-500 mb-4">Server</h3>
                <div className="grid gap-2">
                  <Label htmlFor="duration">
                    Thời hạn (tháng)<span className="text-red-500">(*)</span>
                  </Label>
                  <Input
                    type="number"
                    id="duration"
                    {...register('duration', { valueAsNumber: true, required: 'Thời hạn là bắt buộc' })}
                    defaultValue={1}
                  />
                  {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
                </div>
              </div>

              {/* Payment Section */}
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <p className="text-base text-gray-700">
                    Số tiền cần thanh toán: <span className="text-red-500 font-bold">15.000đ</span>
                  </p>
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  THANH TOÁN
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel */}
          <Card className="border-0 shadow-md">
            {/* Header */}
            <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">LƯU Ý</span>
            </div>

            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-red-500 mb-4">Quy định về việc sử dụng hệ thống CRON:</h3>

              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-medium">- Không kích hoạt Firewall đối với các liên kết CRON:</p>
                  <p className="ml-4">
                    Việc bật Firewall có thể gây gián đoạn hệ thống và ngăn cản CRON thực hiện nhiệm vụ.
                  </p>
                </div>

                <div>
                  <p className="font-medium">- Sử dụng hệ thống CRON đúng mục đích:</p>
                  <p className="ml-4">
                    Chúng tôi có quyền tạm ngưng hoặc hủy vĩnh viễn các liên kết CRON vi phạm, đặc biệt trong các trường
                    hợp lạm dụng gây ảnh hưởng đến hệ thống.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};
