import { FC, ReactNode, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Link, redirect } from '@tanstack/react-router';
import SanitizedComponent from '@/components/common/sanitized';
import { LoginMutationResponse } from '@/api/actions/auth/auth.types';
import { toast } from 'react-toastify';
import authStore from '@/stores/authState';
import { useMutation, useQuery } from '@/hooks';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/schema/loginSchema';
import { captchaQueries } from '@/api/actions/captcha/captcha.queries';

const LoginScreen: FC = (): ReactNode => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
    },
    onError: (error: StandardizedApiError) => {
      toast.error(error.message);
    },
  });

  const handleRegisterClick = async () => {
    redirect({ to: '/register' });
  };

  const handleLogin = async (data: LoginFormData): Promise<void> => {
    console.log('dsfds');
    await login({
      userCredential: data.userCredential,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" {...register('userCredential')} />
              {errors.userCredential && <p className="text-red-500 text-sm">{errors.userCredential.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {/*<div className="flex items-center space-x-2">*/}
            {/*  <Checkbox id="remember" {...register('rememberMe')} />*/}
            {/*  <label*/}
            {/*    htmlFor="remember"*/}
            {/*    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
            {/*  >*/}
            {/*    Remember me*/}
            {/*  </label>*/}
            {/*</div>*/}
            {/* Captcha Input */}
            {/*<div className="space-y-2">*/}
            {/*  <Label htmlFor="captcha">Captcha</Label>*/}
            {/*  <Input id="captcha" type="text" placeholder="Enter CAPTCHA" {...register('captcha')} />*/}
            {/*  {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha.message}</p>}*/}
            {/*</div>*/}
            <Button type="submit" className="w-full" disabled={isAuthenticating}>
              {isAuthenticating ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <p className="text-center text-sm text-gray-600 mt-2">
            <Link to="/forgot-pass" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            <SanitizedComponent content="Don't have an account? " />
            <span>
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Register here
              </Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginScreen;
