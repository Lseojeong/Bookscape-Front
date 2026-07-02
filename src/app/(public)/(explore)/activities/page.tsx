import { Metadata } from 'next';
import { Suspense } from 'react';
import ActivitiesPageHeader from '@/features/activity/activities/ui/ActivitiesPageHeader';
import AllActivitiesSection from '@/features/activity/activities/ui/AllActivitiesSection';
import ActivityCardSkeleton from '@/features/activity/common/ui/skeleton/ActivityCardSkeleton';
import { COMMON_OPEN_GRAPH } from '@/shared/constants/metadata';

export const metadata: Metadata = {
  title: '모든 체험 둘러보기',
  description: '카테고리와 맞춤 검색으로 내 취향에 딱 맞는 체험을 북스케이프에서 찾아보세요.',
  openGraph: {
    ...COMMON_OPEN_GRAPH,
    url: '/activities',
  },
};

/**
 * 체험 목록 페이지 컴포넌트입니다.
 * 헤더(검색·카테고리·정렬)와 전체 체험 목록 섹션으로 구성됩니다.
 */
export default function ActivitiesPage() {
  const skeletonFallback = (
    <div className="mt-5 grid grid-cols-2 gap-4.5 md:gap-5 lg:grid-cols-4 lg:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ActivityCardSkeleton key={i} className={i >= 6 ? 'hidden lg:block' : ''} />
      ))}
    </div>
  );

  return (
    <div className="mx-auto mt-12 mb-10 flex max-w-280 flex-col gap-4 px-6 md:mt-16.5 md:mb-25 md:gap-7.5 md:px-7.5 xl:px-0">
      <Suspense fallback={skeletonFallback}>
        <ActivitiesPageHeader />
        <AllActivitiesSection />
      </Suspense>
    </div>
  );
}
