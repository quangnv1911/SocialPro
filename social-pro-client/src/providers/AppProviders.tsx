'use client';
import { FC, ReactNode } from 'react';
import { AppProvidersProps } from './AppProviders.type';
import ApiClientContextController from '@/context/apiClient/apiClientContextController/ApiClientContextController';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ToastContainer } from 'react-toastify';

const AppProviders: FC<AppProvidersProps> = ({ children }: AppProvidersProps): ReactNode => {
  return <ApiClientContextController>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ToastContainer
        autoClose={300}
        position="top-right"
      />
    </ThemeProvider>

  </ApiClientContextController>;
};

export default AppProviders;
