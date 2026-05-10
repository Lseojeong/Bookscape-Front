import { useSearchParams } from 'next/navigation';
import { useActivityList } from '@/features/activity/hooks/useActivityList';

export const useAllActivityList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? '전체';
  const sort = searchParams.get('sort') ?? 'most_reviewed';

  const { page, activities, totalCount, totalPages, updateParams, handlePageChange } =
    useActivityList({
      category,
      sort,
      pageSize: { mobile: 6, tablet: 6, desktop: 12 },
      basePath: '/activities',
    });

  const handleChangeCategory = (newCategory: string) => {
    updateParams({ category: newCategory, page: '1' });
  };

  const handleChangeSort = (newSort: string) => {
    updateParams({ sort: newSort, page: '1' });
  };

  return {
    page,
    category,
    sort,
    activities,
    totalCount,
    totalPages,
    handleChangeCategory,
    handleChangeSort,
    handlePageChange,
  };
};
