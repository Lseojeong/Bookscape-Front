import { Suspense } from 'react';
import ReservationListView from '@/features/reservation/reservation-list/ui/my-reservation-list/ReservationListView';

export default function ReservationListPage() {
  return (
    <Suspense>
      <ReservationListView />
    </Suspense>
  );
}
