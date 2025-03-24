'user client';
// LayoutComponent.tsx
import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from './error-boundary';
import { MainSidebar } from '@/layout/sider';
import Header from '@/layout/header';

const LayoutComponent = ({
                           children,
                         }: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <MainSidebar className="h-[calc(100vh-4rem)] sticky top-16 shrink-0 border-r" />

        <main className="flex-1 p-6 space-y-6">
          <ErrorBoundary fallbackRender={FallbackRender}>
            <Suspense
              fallback={
                <div className="w-full h-full flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              }
            >
              {children}
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>


  );
};

export default LayoutComponent;