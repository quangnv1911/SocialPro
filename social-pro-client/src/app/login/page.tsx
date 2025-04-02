'use client';

import Link from 'next/link';
import { useMutation } from '@/hooks';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import authStore from '@/stores/authState';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/schema/loginSchema';
import { LoginMutationResponse } from '@/api/actions/auth/auth.types';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { FC, ReactElement } from 'react';

const LoginPage: FC = (): ReactElement => {
  const router = useRouter();
  const { setAuthData } = authStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userCredential: '',
      password: '',
    },
  });

  const { mutateAsync: login, isPending: isAuthenticating } = useMutation('loginMutation', {
    onSuccess: (res: LoginMutationResponse) => {
      toast.success('Đăng nhập thành công');
      setAuthData(res.accessToken, res.refreshToken, res.role, res.userName, res.email, res.image, res.isAuthenticated);
      router.push('/');
    },
    onError: (error: StandardizedApiError) => {
      toast.error((error.data as { message?: string })?.message ?? 'Đăng nhập thất bại');
    },
  });

  const handleLogin = async (data: LoginFormData): Promise<void> => {
    await login({
      userCredential: data.userCredential,
      password: data.password,
    });
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          <p className="text-gray-600">Nhập thông tin đăng nhập của bạn</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              {...register('userCredential')}
              disabled={isAuthenticating}
            />
            {errors.userCredential && <p className="text-red-500 text-sm">{errors.userCredential.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" {...register('password')} disabled={isAuthenticating} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              disabled={isAuthenticating}
            >
              {isAuthenticating ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>

            <div className="text-center text-sm">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="text-yellow-600 hover:underline">
                Đăng ký
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
