import { useSearchParams } from 'next/navigation';
import { useActivityList } from '@/features/activity/hooks/useActivityList';

/**
 * 체험 목록 페이지의 상태와 핸들러를 관리하는 훅입니다.
 * URL 파라미터에서 카테고리·정렬 기준을 읽어오며,
 * 변경 시 page를 1로 초기화하고 URL을 업데이트합니다.
 */
export const useAllActivityList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? '전체';
  const sort = searchParams.get('sort') ?? 'latest';

  const {
    page,
    activities,
    totalCount,
    totalPages,
    updateParams,
    handlePageChange,
    isLoading,
    isError,
  } = useActivityList({
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
    isLoading,
    isError,
    handleChangeCategory,
    handleChangeSort,
    handlePageChange,
  };
};
