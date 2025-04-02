'use client';

import { FC, ReactElement, useState, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';
import { toast } from 'react-toastify';
import { useMutation } from '@/hooks';

const VerifyAccountPage: FC = (): ReactElement => {
  const searchParams = useSearchParams();
  const accountParam = searchParams.get('account');
  const otpParam = searchParams.get('otp');

  const [email, setEmail] = useState(accountParam || '');
  const [verificationCode, setVerificationCode] = useState(otpParam || '');

  const { mutateAsync: verifyAccount, isPending: isVerifying } = useMutation('verifyAccountMutation', {
    onSuccess: () => {
      toast.success('Xác thực tài khoản thành công');
      redirect('/login');
    },
    onError: (error: StandardizedApiError) => {
      toast.error((error.data as { message?: string })?.message ?? 'Xác thực tài khoản thất bại');
    },
  });

  // Auto-submit when both parameters are present
  useEffect(() => {
    if (accountParam && otpParam) {
      handleVerification();
    }
  }, [accountParam, otpParam]);

  const handleVerification = async () => {
    verifyAccount({
      account: email,
      otp: verificationCode,
    });
  };

  return (
    <main className="container mx-auto py-6 space-y-8">
      <h1 className="text-2xl font-bold">Verify Your Account</h1>
      <p>Please enter the verification code sent to {email || 'your email'}</p>

      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={isVerifying}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium mb-1">
            Verification Code
          </label>
          <input
            type="text"
            id="otp"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full p-2 border rounded text-center tracking-wider"
            maxLength={6}
            disabled={isVerifying}
          />
        </div>

        <button
          onClick={handleVerification}
          disabled={isVerifying || !email || !verificationCode}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isVerifying ? 'Verifying...' : 'Verify Account'}
        </button>
      </div>
    </main>
  );
};

export default VerifyAccountPage;
