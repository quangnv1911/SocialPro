'use client';
import { FC, ReactElement, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RegisterModal from '@/components/features/register';
import { useMutation, useQuery } from '@/hooks';
import authStore from '@/stores/authState';
import { captchaQueries } from '@/api/actions/captcha/captcha.queries';
import { useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '@/schema/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { LoginMutationResponse } from '@/api/actions/auth/auth.types';


const LoginModal: FC = (): ReactElement => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

  const { refetch: getCaptchaValue } = useQuery({
    ...captchaQueries.get(),
  });
  const { mutateAsync: login, isPending: isAuthenticating } = useMutation('loginMutation', {
    onSuccess: (res: LoginMutationResponse) => {
      toast.success('Đăng nhập thành công');
      setAuthData(res.accessToken, res.refreshToken, res.role, res.userName, res.email, res.image, res.isAuthenticated);
      setShowLogin(false);
    },
    onError: (error: StandardizedApiError) => {
      toast.error(error.message);
    },
  });

  const handleRegisterClick = async () => {
    setShowLogin(false);
    await getCaptchaValue();
    setShowRegister(true);
  };

  const handleLogin = async (data: LoginFormData): Promise<void> => {
    await login({
      userCredential: data.userCredential,
      password: data.password,
    });
  };
  return (
    <>
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100">
            Đăng nhập
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đăng nhập</DialogTitle>
            <DialogDescription>Nhập thông tin đăng nhập của bạn</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4 py-4">
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
              <Input
                id="password"
                type="password"
                {...register('password')}
                disabled={isAuthenticating}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-900 to-blue-700"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
              <div className="text-center text-sm">
                Chưa có tài khoản?{' '}
                <Button
                  variant="link"
                  className="p-0 text-blue-600"
                  onClick={handleRegisterClick}
                  disabled={isAuthenticating}
                >
                  Đăng ký
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <RegisterModal
        show={showRegister}
        onClose={() => setShowRegister(false)}
        onBackToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
};

export default LoginModal;