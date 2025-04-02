import { createFileRoute } from '@tanstack/react-router';
import { LOGIN_PATH } from '@/utils/constants';
import LoginScreen from '@/pages/login';

export const Route = createFileRoute(LOGIN_PATH)({
  component: () => <LoginScreen />,
});
