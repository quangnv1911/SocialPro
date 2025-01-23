import LayoutComponent from '../layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{<LayoutComponent>{children}</LayoutComponent>}</body>
    </html>
  );
}
