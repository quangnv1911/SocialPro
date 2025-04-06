'use client';
// LayoutComponent.tsx
import Header from '@/layout/header';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import FallbackRender from './error-boundary';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from './footer';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import UserDataFetcher from '@/components/common/userDataFetcher';

const LayoutComponent = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // Configure NProgress
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      minimum: 0.3,
      easing: 'ease',
      speed: 500,
      trickleSpeed: 200,
    });
  }, []);

  // Set up navigation state tracking
  useEffect(() => {
    // Create a variable to track if component is mounted
    let isMounted = true;

    // Start progress bar
    NProgress.start();
    setIsNavigating(true);

    // Simulate delay for demonstration purposes
    const timer = setTimeout(() => {
      if (isMounted) {
        NProgress.done();
        setIsNavigating(false);
      }
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#FFFFFF00',
        backgroundImage: 'url(/background.png)',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Navigation loading overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
            <p className="text-yellow-600 font-medium">Đang tải...</p>
          </div>
        </div>
      )}
      {/* <UserDataFetcher /> */}
      <Header />
      <div className="flex mt-9">
        <main className="flex-1 p-6 space-y-6">
          <ErrorBoundary fallbackRender={FallbackRender}>
            <Suspense
              fallback={
                <div className="w-full h-full flex justify-center items-center">
                  <Loader2 className="h-8 w-8 animate-spin text-yellow-500 mr-2" />
                  <span>Đang tải...</span>
                </div>
              }
            >
              {children}
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutComponent;
