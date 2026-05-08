import { Suspense } from 'react';
import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainSectionLayout from '@/app/(public)/(explore)/(main)/ui/MainSectionLayout';
import SearchResultSection from '@/app/(public)/(explore)/(main)/ui/SearchResultSection';

/**
 * 검색 페이지 컴포넌트입니다.
 * 히어로 배너와 키워드 기반 검색 결과 목록을 렌더링합니다.
 */
export default function SearchPage() {
  return (
    <>
      {/* 히어로 배너 */}
      <HeroBanner />
      {/* 검색 결과 */}
      <MainSectionLayout className="md:mt-28.75">
        <Suspense fallback={<div>...</div>}>
          <SearchResultSection />
        </Suspense>
      </MainSectionLayout>
    </>
  );
}
