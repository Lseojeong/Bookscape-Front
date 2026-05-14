'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  MY_RESERVATIONS_PAGE_SIZE,
  useInfiniteMyReservations,
} from '@/features/reservation/reservation-list/queries/useInfiniteMyReservations';
import ReservationListSection from '@/features/reservation/reservation-list/ui/my-reservation-list/ReservationListSection';
import ReservationChangePanel from '@/features/reservation/reservation-list/ui/reservation-change/ReservationChangePanel';
import ReservationChangeSheet from '@/features/reservation/reservation-list/ui/reservation-change/ReservationChangeSheet';
import StatusFilter from '@/features/reservation/reservation-list/ui/status-filter/StatusFilter';
import type { MyReservation, MyReservationStatus } from '@/features/reservation/types';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import InfiniteScrollSentinel from '@/shared/ui/infinite-scroll/InfiniteScrollSentinel';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import type { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';

const RESERVATION_LIST_PATH = '/mypage/reservation-list';

const EMPTY_MAIN_TEXT_BY_STATUS: Record<ReservationStatus | '', string> = {
  '': '아직 예약한 체험이 없어요.\n새로운 체험을 예약해보세요!',
  pending: '예약 완료 내역이 없습니다.\n새로운 체험을 예약해보세요!',
  declined: '아직 거절된 내역이 없어요.',
  confirmed: '아직 승인된 내역이 없어요.',
  canceled: '아직 취소된 내역이 없어요.',
  completed: '아직 완료된 내역이 없어요.',
};

const RESERVATION_STATUS_VALUES = [
  'pending',
  'confirmed',
  'declined',
  'canceled',
  'completed',
] satisfies ReservationStatus[];

const isReservationStatus = (value: string | null): value is ReservationStatus => {
  return value !== null && RESERVATION_STATUS_VALUES.includes(value as ReservationStatus);
};

const getReservationListUrl = (status: ReservationStatus | '', searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());

  if (status) {
    params.set('status', status);
  } else {
    params.delete('status');
  }

  const queryString = params.toString();

  return queryString ? `${RESERVATION_LIST_PATH}?${queryString}` : RESERVATION_LIST_PATH;
};

export default function ReservationListView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [activeReservation, setActiveReservation] = useState<MyReservation | null>(null);

  const statusParam = searchParams.get('status');

  const selectedStatus: ReservationStatus = isReservationStatus(statusParam)
    ? statusParam
    : 'pending';

  const handleSelectStatus = (status: ReservationStatus | '') => {
    router.replace(getReservationListUrl(status, searchParams));
  };

  const { query } = useInfiniteMyReservations({
    status: selectedStatus as MyReservationStatus,
    size: MY_RESERVATIONS_PAGE_SIZE,
  });

  const reservations = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.reservations) ?? [];
  }, [query.data?.pages]);

  const isInitialError = query.isError && reservations.length === 0;

  const { setSentinel } = useInfiniteScroll({
    enabled: query.isSuccess && !query.isFetchNextPageError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  return (
    <div className="flex flex-col gap-7.5 pb-17.5">
      <div className="flex flex-col gap-3.5">
        <PageHeader title="예약내역" description="예약내역 변경 및 취소할 수 있습니다." />

        <StatusFilter selectedStatus={selectedStatus} onSelectStatus={handleSelectStatus} />
      </div>

      <ReservationListSection
        isLoading={query.isPending}
        isError={isInitialError}
        reservations={reservations}
        selectedStatus={selectedStatus}
        emptyMainTextByStatus={EMPTY_MAIN_TEXT_BY_STATUS}
        onReservationChangeClick={(reservation) => setActiveReservation(reservation)}
      />

      <InfiniteScrollSentinel
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        isFetchNextPageError={query.isFetchNextPageError}
        onRetryFetchNextPage={() => query.fetchNextPage()}
        setSentinel={setSentinel}
      />

      {activeReservation ? (
        isDesktop ? (
          <ReservationChangePanel
            isOpen
            reservation={activeReservation}
            onClose={() => setActiveReservation(null)}
          />
        ) : (
          <ReservationChangeSheet
            isOpen
            reservation={activeReservation}
            onClose={() => setActiveReservation(null)}
          />
        )
      ) : null}
    </div>
  );
}
