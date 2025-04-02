'use client';

import * as z from 'zod';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@/hooks';
import { ReloadIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schema/registerSchema';
import { captchaQueries } from '@/api/actions/captcha/captcha.queries';
import { RegisterMutationArguments } from '@/api/actions/auth/auth.types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: submitRegister } = useMutation('registerMutation', {
    onSuccess: () => {
      toast.success('Đăng ký thành công');
      router.push('/login');
    },
    onError: () => {
      toast.error('Đăng ký thất bại');
    },
  });
  
  const {
    data: captchaData,
    isLoading: isLoadingCaptcha,
    refetch,
  } = useQuery({
    ...captchaQueries.get(),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const registerRequest: RegisterMutationArguments = {
      userName: data.userName,
      password: data.password,
      email: data.email,
      captchaText: data.captcha,
      captchaId: captchaData?.id,
    };
    // Gửi dữ liệu đến API đăng ký
    await submitRegister(registerRequest);
  };

  return (
    <div className="container mx-auto max-w-screen-md py-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>
          <p className="text-gray-600">Nhập thông tin để tạo tài khoản mới</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* User name field */}
          <div className="grid gap-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input id="userName" {...register('userName')} placeholder="quangss310" />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} placeholder="email@example.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Mật khẩu */}
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
            <Input id="confirm-password" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Captcha */}
          <div className="grid gap-2">
            <Label htmlFor="captcha-input">Nhập mã captcha</Label>
            <div className="flex items-center gap-3">
              {captchaData && (
                <div className="border rounded overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={`data:image/png;base64,${captchaData.imageBase64}`}
                    alt="CAPTCHA"
                    width={120}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 relative">
                <Input
                  id="captcha-input"
                  {...register('captcha', { required: 'Captcha is required' })}
                  placeholder="Nhập mã xác thực"
                  className="pr-10"
                />
                <button 
                  type="button" 
                  onClick={() => refetch()} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                >
                  <ReloadIcon className="w-4 h-4 text-yellow-500" />
                </button>
              </div>
            </div>
            {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha.message}</p>}
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <Button
              type="submit"
              className="w-full bg-yellow-300 text-white hover:bg-yellow-400"
              disabled={isSubmitting || isLoadingCaptcha}
            >
              {isLoadingCaptcha ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
            <div className="text-center text-sm">
              Đã có tài khoản?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}