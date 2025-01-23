import { createFileRoute } from '@tanstack/react-router'
import { LOGIN_PATH } from '@/utils/constants'
import Login from '@/pages/login'

export const Route = createFileRoute('/about/')({
  component: () => <Login />,
})
