import { Suspense } from 'react';
import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';

/**
 * 메인 페이지 및 검색 페이지에서 공통으로 사용하는 섹션 레이아웃 컴포넌트입니다.
 * 히어로 배너를 제공합니다.
 */
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<div>...</div>}>
        <HeroBanner />
        {children}
      </Suspense>
    </>
  );
}
