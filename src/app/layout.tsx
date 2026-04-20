import type { Metadata } from 'next';
import QueryProvider from '@/shared/providers/QueryProvider';
import '@/shared/styles/globals.css';

export const metadata: Metadata = {
  title: '북스케이프: bookscape',
  description: '체험을 만들고, 찾고, 예약까지 한 번에 북스케이프에서 경험해보세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
