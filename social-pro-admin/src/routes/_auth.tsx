import LayoutComponent from '@/layout';
import authStore from '@/stores/authState';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const { isAuthenticated } = authStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: LayoutComponent,
});
