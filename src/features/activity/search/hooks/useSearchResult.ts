import { useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useState } from 'react';
import { useSearchActivityData } from '@/features/activity/search/queries/useSearchActivityData';
import { usePageSize } from '@/shared/hooks/usePageSize';

/**
 * 검색 결과 페이지의 상태 및 데이터 패칭 로직을 관리하는 훅입니다.
 * 키워드, 카테고리, 페이지, 페이지 크기를 관리하며
 * 브레이크포인트 변경 시 페이지를 자동으로 초기화합니다.
 *
 * @returns keyword - URL 쿼리에서 가져온 검색 키워드
 * @returns page - 현재 페이지 번호
 * @returns setPage - 페이지 변경 함수
 * @returns category - 선택된 카테고리
 * @returns handleChangeCategory - 카테고리 변경 및 페이지 초기화 함수
 * @returns activities - 검색된 체험 목록
 * @returns totalCount - 전체 검색 결과 수
 * @returns totalPages - 전체 페이지 수
 * @returns totalResultCount - 카테고리 상관없이 전체 검색 결과 수
 *
 * @example
 * ```tsx
 * const { keyword, activities, totalPages, page, setPage } = useSearchResult();
 * ```
 */
export const useSearchResult = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('전체');

  // 한 페이지에 노출 시킬 카드 개수
  const pageSize = usePageSize({ mobile: 6, tablet: 4, desktop: 8 });

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
  };

  // pageSize 변경 시 페이지 초기화
  useEffect(() => {
    startTransition(() => {
      setPage(1);
    });
  }, [pageSize]);

  // 검색 카테고리
  const { data } = useSearchActivityData({
    keyword,
    category: category === '전체' ? '' : category,
    page,
    size: pageSize,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;

  // totalCount를 pageSize로 나눠 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / pageSize);

  // 전체 검색 결과 수(카테고리 상관없이)
  const { data: totalData } = useSearchActivityData({
    keyword,
    size: 1,
  });
  const totalResultCount = totalData?.totalCount ?? 0;

  return {
    keyword,
    page,
    setPage,
    category,
    handleChangeCategory,
    activities,
    totalCount,
    totalPages,
    totalResultCount,
  };
};
