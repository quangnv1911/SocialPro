import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routeTree } from './routeTree.gen';
import { enableMocking } from '@/scripts/test/setupMSW';
import { logger } from '@/integration/logger';
import AppProviders from '@/providers/AppProviders';

if (import.meta.env.DEV) {
  import.meta.glob('./wdyr.ts', { eager: true });
}

const openReactQueryDevtools: boolean = import.meta.env.DEV;
if (import.meta.env.VITE_SENTRY_DSN) {
  logger.init();
}

const container: HTMLElement | null = document.getElementById('root');
const root: Root = createRoot(container as Element);

export const router = createRouter({ routeTree });

enableMocking().then(() =>
  root.render(
    <StrictMode>
      <AppProviders>
        <RouterProvider router={router} />
        {openReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
      </AppProviders>
    </StrictMode>,
  ),
);
