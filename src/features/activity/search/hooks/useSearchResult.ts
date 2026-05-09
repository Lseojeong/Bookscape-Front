'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useCallback, useEffect } from 'react';
import {
  usePrefetchNextPage,
  useSearchActivityData,
} from '@/features/activity/search/queries/useSearchActivityData';
import { usePageSize } from '@/shared/hooks/usePageSize';

/**
 * 검색 결과 페이지의 상태 및 데이터 패칭 로직을 관리하는 훅입니다.
 * 키워드, 카테고리, 페이지, 페이지 크기를 관리하며
 * 브레이크포인트 변경 시 페이지를 자동으로 초기화합니다.
 *
 * @returns keyword - URL 쿼리에서 가져온 검색 키워드
 * @returns page - 현재 페이지 번호
 * @returns category - 선택된 카테고리
 * @returns handleChangeCategory - 카테고리 변경 및 페이지 초기화 함수
 * @returns activities - 검색된 체험 목록
 * @returns totalCount - 전체 검색 결과 수
 * @returns totalPages - 전체 페이지 수
 * @returns totalResultCount - 카테고리 상관없이 전체 검색 결과 수
 * @returns handlePageChange - 페이지 변경 함수
 *
 * @example
 * ```tsx
 * const { keyword, activities, totalPages, page, handlePageChange } = useSearchResult();
 * ```
 */
export const useSearchResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const page = Number(searchParams.get('page') ?? 1);
  const category = searchParams.get('category') ?? '전체';

  // 한 페이지에 노출 시킬 카드 개수
  const pageSize = usePageSize({ mobile: 6, tablet: 4, desktop: 8 });

  // URL 파라미터를 업데이트하는 공통 함수
  // push: 히스토리에 추가 (뒤로가기 가능), replace: 현재 URL 덮어쓰기
  const updateParams = useCallback(
    (updates: Record<string, string>, mode: 'push' | 'replace' = 'push') => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => params.set(key, value));

      if (mode === 'replace') {
        router.replace('/search?' + params.toString());
      } else {
        router.push('/search?' + params.toString());
      }
    },
    [searchParams, router]
  );

  // 카테고리 변경 시 page 1로 초기화
  const handleChangeCategory = (newCategory: string) => {
    updateParams({ category: newCategory, page: '1' });
  };

  // pageSize 변경 시 페이지 초기화
  useEffect(() => {
    startTransition(() => {
      updateParams({ page: '1' }, 'replace');
    });
  }, [pageSize, updateParams]);

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

  // 다음 페이지 prefetch (마지막 페이지면 실행 안 함)
  usePrefetchNextPage({
    keyword,
    category: category === '전체' ? '' : category,
    page,
    size: pageSize,
    totalPages,
  });

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
    handlePageChange: (newPage: number) => updateParams({ page: String(newPage) }),
  };
};
