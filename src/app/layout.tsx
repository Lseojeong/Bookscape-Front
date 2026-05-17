import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Suspense } from 'react';
import AuthExpiredRedirect from '@/features/auth/providers/AuthExpiredRedirect';
import AuthSessionGuard from '@/features/auth/providers/AuthSessionGuard';
import AuthSessionSync from '@/features/auth/providers/AuthSessionSync';
import AuthTokenRefreshProvider from '@/features/auth/providers/AuthTokenRefreshProvider';
import { COMMON_OPEN_GRAPH } from '@/shared/constants/metadata';
import { SITE_URL } from '@/shared/constants/url';
import KakaoInit from '@/shared/providers/KakaoInit';
import QueryProvider from '@/shared/providers/QueryProvider';
import { OVERLAY_ROOT_ID } from '@/shared/ui/overlay/constants';
import OverlayRoot from '@/shared/ui/overlay/root/OverlayRoot';
import ToastContainer from '@/shared/ui/toast/ToastContainer';
import '@/shared/styles/globals.css';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: '북스케이프',
      alternateName: 'Bookscape',
      url: SITE_URL,
    },
    {
      '@type': 'Organization',
      name: '북스케이프',
      alternateName: 'Bookscape',
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
    },
  ],
} as const;

// 공통 메타 데이터 및 OG 설정
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: '북스케이프: bookscape',
    template: '%s | 북스케이프',
  },
  description: '체험을 만들고, 찾고, 예약까지 한 번에 북스케이프에서 경험해보세요!',
  keywords: ['체험', '원데이클래스', '예약', '북스케이프', 'bookscape', '액티비티'],

  verification: {
    // NOTE: 구글 서치 콘솔 인증을 위한 환경 변수입니다. 빌드 시점에 해당 값이 존재해야 메타 태그가 생성됩니다.
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },

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

// 기본 뷰포트 설정
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <QueryProvider>
          <AuthTokenRefreshProvider>
            <AuthSessionSync />
            <AuthSessionGuard />
            <Suspense fallback={null}>
              <AuthExpiredRedirect />
            </Suspense>
            {children}
            <Script
              src="//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
              strategy="lazyOnload"
            />
            <Script
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
              strategy="afterInteractive"
            />
            <KakaoInit />
            <ToastContainer />
          </AuthTokenRefreshProvider>
        </QueryProvider>
        <OverlayRoot />
        <div id={OVERLAY_ROOT_ID} />
      </body>
    </html>
  );
}
