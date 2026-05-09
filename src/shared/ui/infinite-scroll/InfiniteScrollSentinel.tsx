'use client';

import Button from '@/shared/ui/button/Button';
import Loading from '@/shared/ui/loading/Loading';

/**
 * ## InfiniteScrollSentinel
 *
 * @description
 * 무한 스크롤용 "센티넬(sentinel)" UI 컴포넌트입니다.
 * - `setSentinel`을 `ref`로 연결해 IntersectionObserver가 관찰할 DOM을 제공합니다.
 * - 다음 페이지 로딩 중에는 로딩 인디케이터를 표시합니다.
 * - 다음 페이지 로딩 실패 시에는 "다시 불러오기" 버튼을 표시합니다.
 *
 * @example
 * ```tsx
 * <InfiniteScrollSentinel
 *   hasNextPage={query.hasNextPage}
 *   isFetchingNextPage={query.isFetchingNextPage}
 *   isFetchNextPageError={query.isFetchNextPageError}
 *   onRetryFetchNextPage={() => query.fetchNextPage()}
 *   setSentinel={setSentinel}
 * />
 * ```
 */
type InfiniteScrollSentinelProps = {
  /** 다음 페이지 존재 여부 */
  hasNextPage: boolean;
  /** 다음 페이지 로딩 중 여부 */
  isFetchingNextPage: boolean;
  /** 다음 페이지 로딩 에러 여부 */
  isFetchNextPageError: boolean;
  /** "다시 불러오기" 클릭 시 실행할 핸들러 */
  onRetryFetchNextPage: () => void;
  /** 센티넬 요소에 연결할 ref 콜백 */
  setSentinel: (node: HTMLDivElement | null) => void;
  /** 재시도 버튼 라벨 (기본값: '다시 불러오기') */
  retryText?: string;
};

export default function InfiniteScrollSentinel({
  hasNextPage,
  isFetchingNextPage,
  isFetchNextPageError,
  onRetryFetchNextPage,
  setSentinel,
  retryText = '다시 불러오기',
}: InfiniteScrollSentinelProps) {
  if (!hasNextPage) return null;

  return (
    <div ref={setSentinel} className="flex min-h-1 w-full justify-center py-6">
      {isFetchingNextPage ? <Loading size={20} color="var(--color-gray-600)" /> : null}
      {!isFetchingNextPage && isFetchNextPageError ? (
        <Button type="button" theme="secondary" size="md" onClick={onRetryFetchNextPage}>
          {retryText}
        </Button>
      ) : null}
    </div>
  );
}
