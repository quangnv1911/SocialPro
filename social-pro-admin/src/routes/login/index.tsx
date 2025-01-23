import { createFileRoute } from '@tanstack/react-router';
import Login from '@/pages/login';
import { LOGIN_PATH } from '@/utils/constants';

export const Route = createFileRoute(LOGIN_PATH)({
  component: () => <Login />,
});
