import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
// see https://testing-library.com/docs/react-testing-library/setup#custom-render
import { Queries } from '@testing-library/dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React from 'react';
import { ExtraRenderOptions, WrapperProps } from './type';
import ApiClientContextController from '@/context/apiClient/apiClientContextController/ApiClientContextController';

// @TODO: https://bitbucket.org/thesoftwarehouse/react-starter-boilerplate/pull-requests/5/rss-9-add-login-page/diff#comment-132626297
const _Wrapper = ({ children, routerConfig = {} }: WrapperProps) => {
  const { routerPath = '/', currentPath = routerPath } = routerConfig;

  const rootRoute = createRootRoute({ component: () => <Outlet /> });

  const componentRoute = createRoute({
    path: routerPath,
    getParentRoute: () => rootRoute,
    component: () => children,
  });
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [currentPath],
    }),
    routeTree: rootRoute.addChildren([componentRoute]),
  });

  return (
    <ApiClientContextController>
      <RouterProvider router={router} />
    </ApiClientContextController>
  );
};

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'> & ExtraRenderOptions,
): RenderResult;
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q> & ExtraRenderOptions,
): RenderResult<Q>;
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options?: (RenderOptions<Q> | Omit<RenderOptions, 'queries'>) & ExtraRenderOptions,
): RenderResult<Q> | RenderResult {
  const Wrapper = ({ children }: Pick<WrapperProps, 'children'>) => (
    <_Wrapper routerConfig={options?.routerConfig}>{children}</_Wrapper>
  );

  return render<Q>(ui, { wrapper: options?.wrapper ?? Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
