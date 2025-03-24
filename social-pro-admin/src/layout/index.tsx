import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from '@tanstack/react-router';
import FooterComponent from './footer';
import HeaderComponent from './header';
import FallbackRender from '@/layout/error-boundary';
import SideBar from './sidebar';

const LayoutComponent = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 flex-col bg-muted/40 md:flex">
        <SideBar />
      </div>
      <div className="flex-1">
        <div className="h-16" />
        <HeaderComponent />
        <main
          className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800
              dark:text-gray-200"
        >
          <ErrorBoundary fallbackRender={FallbackRender}>
            <Suspense
              fallback={
                <div className=" w-full h-full flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
        <FooterComponent />
      </div>
    </div>
  );
};

export default LayoutComponent;
