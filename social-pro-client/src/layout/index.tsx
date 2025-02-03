// LayoutComponent.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import FooterComponent from './footer';
import HeaderComponent from './header';
import FallbackRender from './error-boundary';

const LayoutComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-full">
      <HeaderComponent />
      <div className="px-4 py-20 flex flex-col min-h-[calc(100vh-200px)]">
        {/* Đảm bảo rằng fallbackRender là một component hợp lệ */}
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
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;
