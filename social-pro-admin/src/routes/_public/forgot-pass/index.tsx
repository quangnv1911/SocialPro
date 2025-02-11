import ForgotPasswordScreen from '@/pages/forgot-pass';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/forgot-pass/')({
  component: ForgotPasswordScreen,
});
