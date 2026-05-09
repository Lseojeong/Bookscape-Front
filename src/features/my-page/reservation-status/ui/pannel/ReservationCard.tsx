import type { MyActivityReservation } from '@/features/my-page/types';
import Button from '@/shared/ui/button/Button';
import StateBadge from '@/shared/ui/state-badge/StateBadge';

type ReservationCardProps = {
  reservation: MyActivityReservation;
  onConfirm?: (id: number) => void;
  onDecline?: (id: number) => void;
  isLoading?: boolean;
};

/**
 *  단일 예약 정보를 카드 형태로 표시하는 컴포넌트.
 *
 * - `'pending'` 상태: 승인 / 거절 버튼 노출
 * - `'confirmed'` 상태: 확정 배지 노출
 * - `'declined'` 상태: 거절 배지 노출
 *
 * @example
 * ```tsx
 * <ReservationCard
 *   reservation={reservation}
 *   onConfirm={(id) => handleConfirm(id)}
 *   onDecline={(id) => handleDecline(id)}
 * />
 * ```
 */

export default function ReservationCard({
  reservation,
  onConfirm,
  onDecline,
  isLoading = false,
}: ReservationCardProps) {
  const isPending = reservation.status === 'pending';
  const isConfirmed = reservation.status === 'confirmed';
  const isDeclined = reservation.status === 'declined';

  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div>
            <span className="mr-2 inline-block w-10.5 typo-16-bold text-gray-500">닉네임</span>
            <span className="typo-16-medium">{reservation.nickname}</span>
          </div>
          <div>
            <span className="mr-2 inline-block w-10.5 typo-16-bold text-gray-500">인원</span>
            <span className="typo-16-medium">{reservation.headCount}명</span>
          </div>
        </div>
        {isConfirmed && <StateBadge status="pending" />}
        {isDeclined && <StateBadge status="declined" />}
      </div>

      {isPending && onConfirm && onDecline && (
        <div className="mt-5 flex h-12 gap-2.5">
          <Button
            theme="primary"
            size="sm"
            className="h-full flex-1"
            onClick={() => onConfirm(reservation.id)}
            isLoading={isLoading}
          >
            승인하기
          </Button>
          <Button
            theme="secondary"
            size="sm"
            className="h-full flex-1 border-gray-100"
            onClick={() => onDecline(reservation.id)}
            isLoading={isLoading}
          >
            거절하기
          </Button>
        </div>
      )}
    </div>
  );
}
