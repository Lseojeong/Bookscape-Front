import type { Metadata } from 'next';
import localFont from 'next/font/local';
import QueryProvider from '@/shared/providers/QueryProvider';
import '@/shared/styles/globals.css';

//TODO: 메타태그 수정하기
export const metadata: Metadata = {
  title: '북스케이프: bookscape',
  description: '체험을 만들고, 찾고, 예약까지 한 번에 북스케이프에서 경험해보세요!',
};

// 폰트 파일 로드 + CSS 변수 등록
const pretendard = localFont({
  src: '../shared/assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
