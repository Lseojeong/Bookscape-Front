'use client';

import Button from '@/shared/ui/button/Button';
import Loading from '@/shared/ui/loading/Loading';

type InfiniteScrollSentinelProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  onRetryFetchNextPage: () => void;
  setSentinel: (node: HTMLDivElement | null) => void;
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
