'use client';

import Script from 'next/script';

/**
 * 카카오 SDK를 초기화하는 컴포넌트입니다.
 *
 * @example
 * <KakaoInit />
 */
export default function KakaoInit() {
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        if (
          window.Kakao &&
          !window.Kakao.isInitialized() &&
          process.env.NEXT_PUBLIC_KAKAO_MAP_KEY
        ) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);
        }
      }}
    />
  );
}
