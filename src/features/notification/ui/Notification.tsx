'use client';

import { useState } from 'react';
import type { ParsedNotification } from '@/features/notification/types';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import InfiniteScrollSentinel from '@/shared/ui/infinite-scroll/InfiniteScrollSentinel';
import NotificationItem from './NotificationItem';

interface NotificationModalProps {
  notifications: ParsedNotification[];
  totalCount: number;
  lastSeenAtMs?: number | null;
  onDeleteAll: () => Promise<void>;
  onDeleteOne: (id: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  onFetchNextPage: () => Promise<unknown>;
}
/**
 * 알림 리스트를 표시하는 모달 컴포넌트입니다.
 *
 * @remarks
 * - 전달받은 알림 목록을 기반으로 알림 개수와 리스트를 렌더링합니다.
 * - 알림이 존재할 경우 열 수 있으며 전체 삭제 버튼을 노출합니다.
 * - 알림 리스트 영역은 최대 높이를 가지며, 초과 시 스크롤로 처리됩니다.
 * - 모바일 환경에서는 좌우 여백을 24px로 유지하여 화면 가장자리에 붙지 않도록 합니다.
 *
 * 본 컴포넌트는 UI 렌더링에 집중하며,
 * 알림 데이터의 상태 관리 및 실제 삭제 로직은 상위 컴포넌트에서 책임집니다.
 *
 * @param notifications - 렌더링할 알림 목록
 * @param onDeleteAll - 전체 알림 삭제 처리 함수
 * @param onDeleteOne - 개별 알림 삭제 처리 함수
 * @returns 알림 리스트를 포함한 모달 UI 요소
 *
 * @example
 * ```tsx
 * <NotificationModal
      notifications={notifications}
      onDeleteAll={onDeleteAll}
      onDeleteOne={onDeleteOne}
    />
 * ```
    */
export default function Notification({
  notifications,
  totalCount,
  lastSeenAtMs,
  onDeleteAll,
  onDeleteOne,
  hasNextPage,
  isFetchingNextPage,
  isFetchNextPageError,
  onFetchNextPage,
}: NotificationModalProps) {
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
  const { setSentinel } = useInfiniteScroll({
    enabled: Boolean(scrollRoot),
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage: onFetchNextPage,
    root: scrollRoot,
    rootMargin: '0px 0px 40px 0px',
  });

  return (
    <div className="absolute top-[calc(100%+8px)] right-0 layer-dropdown max-h-[340px] w-65 rounded-xl bg-white pt-4 pb-2 shadow-card max-sm:fixed max-sm:top-14 max-sm:right-6 max-sm:left-6 max-sm:w-auto lg:w-92.5">
      <div className="flex items-center justify-between border-b border-gray-50 px-4 pb-3">
        <div className="typo-16-bold">알림 {totalCount}개</div>
        {notifications.length > 0 && (
          <button
            type="button"
            className="typo-13-semibold text-gray-300 hover:text-error active:text-error"
            onClick={onDeleteAll}
          >
            전체삭제
          </button>
        )}
      </div>
      <div
        ref={setScrollRoot}
        className="scrollbar-hidden max-h-50 divide-y divide-gray-50 overflow-x-hidden overflow-y-auto"
      >
        {notifications.map((item) => (
          <NotificationItem
            key={item.id}
            {...item}
            lastSeenAtMs={lastSeenAtMs}
            onDelete={onDeleteOne}
          />
        ))}
        <InfiniteScrollSentinel
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetchNextPageError={isFetchNextPageError}
          onRetryFetchNextPage={() => void onFetchNextPage()}
          setSentinel={setSentinel}
          retryText="더 불러오기"
        />
      </div>
    </div>
  );
}
