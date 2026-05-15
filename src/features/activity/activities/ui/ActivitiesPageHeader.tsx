import ActivityHeaderActionsCategorySort from '@/features/activity/activities/ui/ActivityHeaderActionsCategorySort';
import { ActivityHeaderActionsSearchSort } from '@/features/activity/activities/ui/ActivityHeaderActionsSearchSort';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import SearchInput from '@/shared/ui/search-input/SearchInput';

/**
 * 체험 목록 페이지 헤더 컴포넌트입니다.
 * 반응형 레이아웃으로 구성되며, 화면 크기에 따라 요소 배치가 달라집니다.
 *
 * [모바일]
 * - 상단: SearchInput (full width)
 * - 중단: PageHeader + SortSelectDropdown
 * - 하단: CategoryFilter
 *
 * [태블릿 이상]
 * - 상단: PageHeader + SearchInput
 * - 하단: CategoryFilter + SortSelectDropdown
 */
export default function ActivitiesPageHeader() {
  return (
    <div className="flex flex-col gap-3 sm:gap-9">
      {/* SearchInput — 모바일에서만 상단 full width */}
      <div className="sm:hidden">
        <SearchInput className="h-14! w-full rounded-2xl! px-4! typo-14-medium! shadow-none" />
      </div>

      {/* PageHeader + (모바일: SortSelectDropdown | 데스크탑: SearchInput) */}
      <div className="flex items-center">
        <div className="grow">
          <PageHeader title="체험활동" description="체험을 탐색할 수 있습니다" />
        </div>
        <ActivityHeaderActionsSearchSort />
      </div>

      {/* CategoryFilter + (데스크탑: SortSelectDropdown) */}
      <div className="flex items-center">
        <ActivityHeaderActionsCategorySort />
      </div>
    </div>
  );
}
