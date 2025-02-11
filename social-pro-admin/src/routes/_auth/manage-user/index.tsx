import ManageUserScreen from '@/pages/manage-user';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/manage-user/')({
  component: ManageUserScreen,
});
