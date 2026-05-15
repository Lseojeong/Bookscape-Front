import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import AuthSessionSync from '@/features/auth/providers/AuthSessionSync';
import AuthTokenRefreshProvider from '@/features/auth/providers/AuthTokenRefreshProvider';
import { COMMON_OPEN_GRAPH } from '@/shared/constants/metadata';
import { SITE_URL } from '@/shared/constants/url';
import QueryProvider from '@/shared/providers/QueryProvider';
import { OVERLAY_ROOT_ID } from '@/shared/ui/overlay/constants';
import OverlayRoot from '@/shared/ui/overlay/root/OverlayRoot';
import ToastContainer from '@/shared/ui/toast/ToastContainer';
import '@/shared/styles/globals.css';

// 공통 메타 데이터 및 OG 설정
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: '북스케이프: bookscape',
    template: '%s | 북스케이프',
  },
  description: '체험을 만들고, 찾고, 예약까지 한 번에 북스케이프에서 경험해보세요!',
  keywords: ['체험', '원데이클래스', '예약', '북스케이프', 'bookscape', '액티비티'],

  openGraph: {
    ...COMMON_OPEN_GRAPH,
    url: '/',
  },

  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
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
        <QueryProvider>
          <AuthTokenRefreshProvider>
            <AuthSessionSync />
            {children}
            <Script
              src="//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
              strategy="lazyOnload"
            />
            <Script
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
              strategy="afterInteractive"
            />
            <Script
              src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
              integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
            <ToastContainer />
          </AuthTokenRefreshProvider>
        </QueryProvider>
        <OverlayRoot />
        <div id={OVERLAY_ROOT_ID} />
      </body>
    </html>
  );
}
