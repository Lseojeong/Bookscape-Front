import { MOCK_ACTIVITIES } from '@/features/my-page/reservation-status/mocks/index';
import ReservationPageHeader from '@/features/my-page/reservation-status/ui/ReservationPageHeader';
import ReservationStatusClient from '@/features/my-page/reservation-status/ui/ReservationStatusClient';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
/**
 * 예약 현황 페이지 (서버 컴포넌트)
 *
 * - 페이지 헤더와 빈 상태를 서버에서 렌더링합니다.
 * - 클라이언트 상태 로직은 ReservationStatusClient로 분리합니다.
 */
export default function ReservationStatusPage() {
  const activities = MOCK_ACTIVITIES;
  return (
    <div className="mb-10 flex w-full flex-col gap-6 md:w-119 lg:w-160">
      <ReservationPageHeader />
      {activities.length === 0 ? (
        <EmptyState
          type="experience"
          mainText={'아직 등록한 체험이 없어요.\n새로운 체험을 등록해보세요!'}
        />
      ) : (
        <ReservationStatusClient activities={activities} />
      )}
    </div>
  );
}
