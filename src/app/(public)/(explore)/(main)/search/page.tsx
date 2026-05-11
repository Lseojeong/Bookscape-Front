import { Suspense } from 'react';
import MainSectionLayout from '@/features/activity/main/ui/MainSectionLayout';
import SearchResultSection from '@/features/activity/search/ui/SearchResultSection';
import HeroBanner from '@/features/activity/ui/HeroBanner';

/**
 * 검색 페이지 컴포넌트입니다.
 * 히어로 배너와 키워드 기반 검색 결과 목록을 렌더링합니다.
 */
export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<div>...</div>}>
        {/* 히어로 배너 */}
        <HeroBanner />
        {/* 검색 결과 */}
        <MainSectionLayout className="md:mt-28.75">
          <SearchResultSection />
        </MainSectionLayout>
      </Suspense>
    </>
  );
}
