import { Suspense } from 'react';
import ReservationListView from '@/features/reservation/reservation-list/ui/my-reservation-list/ReservationListView';
import PageHeader from '@/shared/ui/page-header/PageHeader';

export default function ReservationListPage() {
  return (
    <div className="mypage-content">
      <PageHeader title="예약내역" description="예약내역 변경 및 취소할 수 있습니다." />
      <Suspense>
        <ReservationListView />
      </Suspense>
    </div>
  );
}
