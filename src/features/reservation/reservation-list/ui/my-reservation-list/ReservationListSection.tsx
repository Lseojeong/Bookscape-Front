'use client';

import { useMemo } from 'react';
import ReservationCard from '@/features/reservation/reservation-list/ui/reservation-card/ReservationCard';
import type { MyReservation } from '@/features/reservation/types';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import Loading from '@/shared/ui/loading/Loading';
import type { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';

type ReservationListSectionProps = {
  isLoading: boolean;
  reservations: MyReservation[];
  selectedStatus: ReservationStatus | '';
  emptyMainTextByStatus: Record<ReservationStatus | '', string>;
};

const formatReservationDate = (value: string) => {
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) return value;
  return `${year}. ${month.padStart(2, '0')}. ${day.padStart(2, '0')}`;
};

export default function ReservationListSection({
  isLoading,
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

    return dateOrder.map((date) => ({ date, items: group[date] }));
  }, [reservations]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        {/* TODO: 예약내역 로딩 스켈레톤 UI로 교체 */}
        <Loading />
      </div>
    );
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
          <p className="typo-16-bold text-gray-800">{formatReservationDate(date)}</p>
          <div className="flex flex-col gap-7.5">
            {items.map((reservation) => (
              <ReservationCard key={reservation.id} data={reservation} />
            ))}
          </div>
          {index !== reservationsByDate.length - 1 && <div className="mt-5 h-px bg-gray-50" />}
        </section>
      ))}

      {/* TODO: 무한 스크롤 적용 */}
    </div>
  );
}
