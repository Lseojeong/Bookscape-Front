import { Metadata } from 'next';
import { Suspense } from 'react';
import ReservationListView from '@/features/reservation/reservation-list/ui/my-reservation-list/ReservationListView';

export const metadata: Metadata = {
  title: '예약 내역',
};

export default function ReservationListPage() {
  return (
    <Suspense>
      <ReservationListView />
    </Suspense>
  );
}
