import { FC, ReactElement } from 'react';
import PaymentHistory from '@/components/features/payment/payment-history';
import { PaymentForm } from '@/components/features/payment/payment-form';

const PaymentScreen: FC = (): ReactElement => {
  return (
    <main className="container mx-auto py-6 space-y-8">
      <PaymentForm />
      <PaymentHistory />
    </main>);
};

export default PaymentScreen;