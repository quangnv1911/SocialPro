import RegisterScreen from '@/pages/register';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/register/')({
  component: RegisterScreen,
});
