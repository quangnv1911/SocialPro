import { createFileRoute } from '@tanstack/react-router';
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard';

export const Route = createFileRoute('/_public/about/')({
  component: () => <Dashboard />,
});
