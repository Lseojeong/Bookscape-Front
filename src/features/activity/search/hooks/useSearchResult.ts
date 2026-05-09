'use client';
import { useSearchParams } from 'next/navigation';
import { useActivityList } from '@/features/activity/hooks/useActivityList';
import { useSearchActivityData } from '@/features/activity/search/queries/useSearchActivityData';

/**
 * 검색 결과 페이지의 상태 및 데이터 패칭 로직을 관리하는 훅입니다.
 * 키워드, 카테고리, 페이지, 페이지 크기를 관리하며
 * 브레이크포인트 변경 시 페이지를 자동으로 초기화합니다.
 *
 * @example
 * ```tsx
 * const { keyword, activities, totalPages, page, handlePageChange } = useSearchResult();
 * ```
 */
export const useSearchResult = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const category = searchParams.get('category') ?? '전체';

  const { page, activities, totalCount, totalPages, updateParams, handlePageChange } =
    useActivityList({
      keyword,
      category,
      pageSize: { mobile: 6, tablet: 4, desktop: 8 },
      basePath: '/search',
    });

  const handleChangeCategory = (newCategory: string) => {
    updateParams({ category: newCategory, page: '1' });
  };

  // OPTIMIZE : 전체 검색 결과 조회 성능 개선 필요
  // 전체 검색 결과 수(카테고리 상관없이)
  const { data: totalData } = useSearchActivityData(
    { keyword, size: 1 },
    { enabled: category !== '전체' && !!keyword }
  );
  const totalResultCount = category === '전체' ? totalCount : (totalData?.totalCount ?? 0);

  return {
    keyword,
    page,
    category,
    handleChangeCategory,
    activities,
    totalCount,
    totalPages,
    totalResultCount,
    handlePageChange,
  };
};
