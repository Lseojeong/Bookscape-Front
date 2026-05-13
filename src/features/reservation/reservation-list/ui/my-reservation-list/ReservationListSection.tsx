'use client';

import { useMemo } from 'react';
import ReservationCard from '@/features/reservation/reservation-list/ui/reservation-card/ReservationCard';
import ReservationCardSkeleton from '@/features/reservation/reservation-list/ui/skeleton/ReservationCardSkeleton';
import type { MyReservation } from '@/features/reservation/types';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import type { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';
import { formatYmdToDot } from '@/shared/utils/dateFormat';

type ReservationListSectionProps = {
  isLoading: boolean;
  isError?: boolean;
  reservations: MyReservation[];
  selectedStatus: ReservationStatus | '';
  emptyMainTextByStatus: Record<ReservationStatus | '', string>;
};

export default function ReservationListSection({
  isLoading,
  isError = false,
  reservations,
  selectedStatus,
  emptyMainTextByStatus,
}: ReservationListSectionProps) {
  const reservationsByDate = useMemo(() => {
    const group: Record<string, MyReservation[]> = {};
    const dateOrder: string[] = [];

    reservations.forEach((item) => {
      if (!group[item.date]) {
        group[item.date] = [];
        dateOrder.push(item.date);
      }
      group[item.date].push(item);
    });

    return dateOrder.map((date) => ({ date, items: group[date] ?? [] }));
  }, [reservations]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <SkeletonDate />
        <div className="flex flex-col gap-7.5">
          <ReservationCardSkeleton />
          <ReservationCardSkeleton />
          <ReservationCardSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return <EmptyState type="error" mainText={'문제가 발생했어요.\n잠시 후 다시 시도해주세요.'} />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        type="experience"
        mainText={emptyMainTextByStatus[selectedStatus]}
        button={{ href: '/activities', text: '둘러보기' }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-7.5">
      {reservationsByDate.map(({ date, items }, index) => (
        <section key={date} className="flex flex-col gap-3">
          <p className="typo-16-bold text-gray-800">{formatYmdToDot(date)}</p>
          <div className="flex flex-col gap-7.5">
            {items.map((reservation) => (
              <ReservationCard key={reservation.id} data={reservation} />
            ))}
          </div>
          {index !== reservationsByDate.length - 1 && <div className="mt-5 h-px bg-gray-50" />}
        </section>
      ))}
    </div>
  );
}

function SkeletonDate() {
  return <Skeleton className="h-5 w-24 rounded-md" />;
}
