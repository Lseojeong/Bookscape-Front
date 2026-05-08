'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useMyReservations } from '@/features/reservation/reservation-list/queries/useMyReservations';
import type { MyReservationStatus } from '@/features/reservation/types';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import type { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';
import StatusFilter from '../status-filter/StatusFilter';
import ReservationListSection from './ReservationListSection';

export default function ReservationListView() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | ''>('pending');

  const { data, isLoading } = useMyReservations({
    status: (selectedStatus || undefined) as MyReservationStatus | undefined,
    size: 10,
  });

  const reservations = useMemo(() => {
    return data?.reservations ?? [];
  }, [data?.reservations]);

  const EMPTY_MAIN_TEXT_BY_STATUS: Record<ReservationStatus | '', string> = {
    '': '아직 예약한 체험이 없어요.\n새로운 체험을 예약해보세요!',
    pending: '예약 완료 내역이 없습니다.\n새로운 체험을 예약해보세요!',
    declined: '아직 취소된 내역이 없어요.',
    confirmed: '아직 승인된 내역이 없어요.',
    canceled: '아직 거절된 내역이 없어요.',
    completed: '아직 완료된 내역이 없어요.',
  };

  return (
    <div className="flex flex-col gap-7.5 pb-17.5">
      <div className="flex flex-col gap-3.5">
        <PageHeader
          title="예약내역"
          description="예약내역 변경 및 취소할 수 있습니다."
          onBack={() => router.back()}
        />
        <StatusFilter selectedStatus={selectedStatus} onSelectStatus={setSelectedStatus} />
      </div>

      <ReservationListSection
        isLoading={isLoading}
        reservations={reservations}
        selectedStatus={selectedStatus}
        emptyMainTextByStatus={EMPTY_MAIN_TEXT_BY_STATUS}
      />
    </div>
  );
}
