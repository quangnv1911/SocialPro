import { createRootRoute, ScrollRestoration } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import LayoutComponent from '@/layout';
const enableTanstackRouterDevtools = import.meta.env.DEV;

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration />
      <LayoutComponent />
      {enableTanstackRouterDevtools && <TanStackRouterDevtools />}
    </>
  ),
});
