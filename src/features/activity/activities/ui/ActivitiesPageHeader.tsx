'use client';
import { useRouter } from 'next/navigation';
import SortSelectDropdown from '@/app/(public)/(explore)/activities/ui/SortSelectDropdown';
import { useAllActivityList } from '@/features/activity/activities/hooks/useAllActivityList';
import CategoryFilter from '@/features/activity/main/ui/category-filter/CategoryFilter';
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
  const { category, sort, handleChangeCategory, handleChangeSort } = useAllActivityList();

  const router = useRouter();
  return (
    <div className="flex flex-col">
      {/* SearchInput — 모바일에서만 상단 full width */}
      <div className="mb-3 sm:hidden">
        <SearchInput className="h-14! w-full px-4! typo-14-medium! shadow-none" />
      </div>

      {/* PageHeader + (모바일: SortSelectDropdown | 데스크탑: SearchInput) */}
      <div className="mb-7.5 flex items-center sm:mb-9">
        <div className="grow">
          <PageHeader
            title="체험활동"
            description="체험을 탐색하고 예약할 수 있습니다."
            onBack={() => router.back()}
          />
        </div>
        <div className="hidden sm:block">
          <SearchInput className="h-14! px-4! typo-14-medium! shadow-none sm:min-w-79.25" />
        </div>
        <div className="sm:hidden">
          <SortSelectDropdown sortValue={sort} onChangeSortValue={handleChangeSort} />
        </div>
      </div>

      {/* CategoryFilter + (데스크탑: SortSelectDropdown) */}
      <div className="flex items-center">
        <div className="grow">
          <CategoryFilter selectedCategory={category} onChangeCategory={handleChangeCategory} />
        </div>
        <div className="ml-5 hidden min-w-40 sm:block">
          <SortSelectDropdown sortValue={sort} onChangeSortValue={handleChangeSort} />
        </div>
      </div>
    </div>
  );
}
