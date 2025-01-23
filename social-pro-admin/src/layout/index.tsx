import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from '@tanstack/react-router';
import FooterComponent from './footer';
import HeaderComponent from './header';
import FallbackRender from '@/layout/error-boundary';

const LayoutComponent = () => {
  return (
    <div className="w-full h-full">
      <HeaderComponent />
      <div className="px-4 py-20 flex flex-col min-h-[calc(100vh-200px)]">
        <ErrorBoundary fallbackRender={FallbackRender}>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center">
                <span>Loading...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;
