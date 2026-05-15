'use client';
import { useAllActivityList } from '@/features/activity/activities/hooks/useAllActivityList';
import SortSelectDropdown from '@/features/activity/activities/ui/SortSelectDropdown';
import SearchInput from '@/shared/ui/search-input/SearchInput';

export function ActivityHeaderActionsSearchSort() {
  const { sort, handleChangeSort } = useAllActivityList();
  return (
    <>
      <div className="hidden sm:block">
        <SearchInput className="h-14! rounded-2xl! px-4! typo-14-medium! shadow-none sm:min-w-79.25" />
      </div>
      <div className="sm:hidden">
        <SortSelectDropdown sortValue={sort} onChangeSortValue={handleChangeSort} />
      </div>
    </>
  );
}
