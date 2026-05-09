'use client';
import { useRouter } from 'next/navigation';
import SortSelectDropdown from '@/app/(public)/(explore)/activities/ui/SortSelectDropdown';
import CategoryFilter from '@/features/activity/main/ui/category-filter/CategoryFilter';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import SearchInput from '@/shared/ui/search-input/SearchInput';

/**
 *
 * 데스크탑 -
 */
export default function ActivitiesPageHeader() {
  const handleChangeCategory = (category: string) => {
    return category;
  };
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
          <SortSelectDropdown />
        </div>
      </div>

      {/* CategoryFilter + (데스크탑: SortSelectDropdown) */}
      <div className="flex items-center">
        <div className="grow">
          <CategoryFilter selectedCategory="전체" onChangeCategory={handleChangeCategory} />
        </div>
        <div className="hidden min-w-46 sm:block">
          <SortSelectDropdown />
        </div>
      </div>
    </div>
  );
}
