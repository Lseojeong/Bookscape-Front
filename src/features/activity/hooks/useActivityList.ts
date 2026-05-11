import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useCallback, useEffect, useRef } from 'react';
import {
  useActivityListData,
  usePrefetchNextPage,
} from '@/features/activity/queries/useActivityListData';
import { usePageSize } from '@/shared/hooks/usePageSize';

type UseActivityListParams = {
  keyword?: string;
  category?: string;
  sort?: string;
  pageSize: { mobile: number; tablet: number; desktop: number };
  basePath: string; // '/search' | '/activities'
};

/**
 * 체험 목록 조회 및 페이지네이션 상태를 관리하는 공통 훅입니다.
 * 검색 페이지와 체험 목록 페이지에서 공통으로 사용됩니다.
 *
 * - URL 파라미터 기반으로 현재 페이지를 관리합니다.
 * - 반응형 pageSize에 따라 페이지를 자동 초기화합니다.
 * - 다음 페이지를 미리 prefetch하여 페이지 전환 시 로딩을 최소화합니다.
 *
 * @param keyword - 검색 키워드 (검색 페이지에서만 사용)
 * @param category - 선택된 카테고리 ('전체'인 경우 빈 문자열로 변환)
 * @param sort - 정렬 기준
 * @param pageSizeConfig - 반응형 페이지 사이즈 설정 ({ mobile, tablet, desktop })
 * @param basePath - URL 업데이트 시 사용할 기본 경로
 */
export const useActivityList = ({
  keyword,
  category,
  sort,
  pageSize: pageSizeConfig,
  basePath,
}: UseActivityListParams) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);

  // 한 페이지에 노출 시킬 카드 개수
  const pageSize = usePageSize(pageSizeConfig);

  // URL 파라미터를 업데이트하는 공통 함수
  const updateParams = useCallback(
    (updates: Record<string, string>, mode: 'push' | 'replace' = 'push') => {
      const params = new URLSearchParams(window.location.search);
      Object.entries(updates).forEach(([key, value]) => params.set(key, value));

      if (mode === 'replace') {
        router.replace(`${basePath}?` + params.toString());
      } else {
        router.push(`${basePath}?` + params.toString());
      }
    },
    [router, basePath]
  );

  // pageSize 변경 시 페이지 초기화
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!pageSize) return;

    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }

    startTransition(() => {
      updateParams({ page: '1' }, 'replace');
    });
  }, [pageSize, updateParams]);

  const { data, isLoading, isError } = useActivityListData({
    keyword,
    category: category === '전체' ? '' : category,
    sort,
    page,
    size: pageSize,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;

  // totalCount를 pageSize로 나눠 총 페이지 수 계산
  const totalPages = pageSize ? Math.ceil(totalCount / pageSize) : 0;

  // 다음 페이지 prefetch (마지막 페이지면 실행 안 함)
  usePrefetchNextPage({
    keyword,
    category: category === '전체' ? '' : category,
    sort,
    page,
    size: pageSize,
    totalPages,
  });

  return {
    page,
    pageSize,
    activities,
    totalCount,
    totalPages,
    isLoading,
    isError,
    updateParams,
    handlePageChange: (newPage: number) => updateParams({ page: String(newPage) }),
  };
};
