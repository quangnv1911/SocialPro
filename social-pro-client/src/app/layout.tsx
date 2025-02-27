import LayoutComponent from '../layout';
import './globals.css';
import * as React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import AppProviders from '@/providers/AppProviders';

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: 'light' }}
      className="light"
    >
    <body>
    <AppProviders>
      <LayoutComponent>{children}</LayoutComponent>
    </AppProviders>

    </body>
    </html>
  );
}
