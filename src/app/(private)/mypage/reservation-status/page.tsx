import { Metadata } from 'next';
import ReservationPageHeader from '@/features/my-page/reservation-status/ui/ReservationPageHeader';
import ReservationStatusClient from '@/features/my-page/reservation-status/ui/ReservationStatusClient';

export const metadata: Metadata = {
  title: '예약 현황',
};

/**
 * 예약 현황 페이지 (서버 컴포넌트)
 *
 * - 페이지 헤더와 빈 상태를 서버에서 렌더링합니다.
 * - 클라이언트 상태 로직은 ReservationStatusClient로 분리합니다.
 */
export default function ReservationStatusPage() {
  return (
    <div className="mb-10 flex w-full flex-col gap-6 md:w-119 lg:w-160">
      <ReservationPageHeader />
      <ReservationStatusClient />
    </div>
  );
}
