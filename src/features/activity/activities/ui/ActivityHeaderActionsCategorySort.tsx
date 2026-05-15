'use client';
import { useAllActivityList } from '@/features/activity/activities/hooks/useAllActivityList';
import SortSelectDropdown from '@/features/activity/activities/ui/SortSelectDropdown';
import CategoryFilter from '@/features/activity/main/ui/category-filter/CategoryFilter';

export default function ActivityHeaderActionsCategorySort() {
  const { category, sort, handleChangeCategory, handleChangeSort } = useAllActivityList();
  return (
    <>
      <div className="grow">
        <CategoryFilter selectedCategory={category} onChangeCategory={handleChangeCategory} />
      </div>
      <div className="ml-5 hidden min-w-40 sm:block">
        <SortSelectDropdown sortValue={sort} onChangeSortValue={handleChangeSort} />
      </div>
    </>
  );
}
