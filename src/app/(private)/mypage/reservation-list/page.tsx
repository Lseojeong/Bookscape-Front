import { Suspense } from 'react';
import ReservationListView from '@/features/reservation/reservation-list/ui/my-reservation-list/ReservationListView';

export default function ReservationListPage() {
  return (
    <div className="mb-10 flex w-full flex-col gap-4 md:w-119 md:gap-7.5 lg:w-160">
      <Suspense>
        <ReservationListView />
      </Suspense>
    </div>
  );
}
