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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterModalProps {
  show: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export default function RegisterModal({ show, onClose, onBackToLogin }: Readonly<RegisterModalProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });


  const { mutateAsync: submitRegister} = useMutation('registerMutation', {
    onSuccess: () => {
      onBackToLogin();
    },
    onError: () => {
      toast.error('Đăng ký thất bại');
    },
  });
  const { data: captchaData, isLoading: isLoadingCaptcha, refetch } = useQuery({
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
    onClose();
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đăng ký tài khoản</DialogTitle>
          <DialogDescription>Nhập thông tin để tạo tài khoản mới</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
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
            <div className="flex items-center space-x-3 justify-between">
              {captchaData && (
                <Image
                  src={`data:image/png;base64,${captchaData.imageBase64}`}
                  alt="CAPTCHA"
                  width={100}
                  height={50}
                  className="border rounded bg-brown-400"
                />
              )}
              <div className="flex items-center px-2 py-1 w-60">
                <input
                  {...register('captcha', { required: 'Captcha is required' })}
                  placeholder="Captcha"
                  className="outline-none w-full border rounded px-2 py-1"
                />
                <button type="button" onClick={() => refetch()} className="ml-2">
                  <ReloadIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha.message}</p>}
            </div>
          </div>


          <div className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-900 to-blue-700"
                    disabled={isSubmitting || isLoadingCaptcha}>
              {isLoadingCaptcha ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
            <div className="text-center text-sm">
              Đã có tài khoản?{' '}
              <Button variant="link" className="p-0 text-blue-600" onClick={onBackToLogin}>
                Đăng nhập
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
