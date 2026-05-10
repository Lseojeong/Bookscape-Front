import AllActivitiesSection from '@/app/(public)/(explore)/activities/ui/AllActivitiesSection';
import ActivitiesPageHeader from '@/features/activity/activities/ui/ActivitiesPageHeader';

/**
 * 체험 목록 페이지 컴포넌트입니다.
 * 헤더(검색·카테고리·정렬)와 전체 체험 목록 섹션으로 구성됩니다.
 */
export default function ActivitiesPage() {
  return (
    <div className="mx-auto mt-12 mb-10 flex max-w-280 flex-col gap-4 px-6 md:mt-16.5 md:mb-25 md:gap-7.5 md:px-7.5 xl:px-0">
      <ActivitiesPageHeader />
      <AllActivitiesSection />
    </div>
  );
}
