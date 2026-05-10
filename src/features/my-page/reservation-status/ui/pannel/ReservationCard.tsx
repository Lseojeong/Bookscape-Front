import { useState } from 'react';
import type { MyActivityReservation } from '@/features/my-page/types';
import Button from '@/shared/ui/button/Button';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
import StateBadge from '@/shared/ui/state-badge/StateBadge';

type ReservationCardProps = {
  reservation: MyActivityReservation;
  onConfirm?: (id: number) => Promise<void>;
  onDecline?: (id: number) => Promise<void>;
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
}: ReservationCardProps) {
  const [loadingType, setLoadingType] = useState<'confirm' | 'decline' | null>(null);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);

  const isPending = reservation.status === 'pending';
  const isConfirmed = reservation.status === 'confirmed';
  const isDeclined = reservation.status === 'declined';

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setLoadingType('confirm');
    try {
      await onConfirm(reservation.id);
    } finally {
      setLoadingType(null);
    }
  };

  const handleDeclineConfirm = async () => {
    if (!onDecline) return;
    setLoadingType('decline');
    try {
      await onDecline(reservation.id);
    } finally {
      setLoadingType(null);
    }
  };

  const isAnyLoading = loadingType !== null;

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
        {isConfirmed && <StateBadge status="confirmed" />}
        {isDeclined && <StateBadge status="declined" />}
      </div>

      {isPending && onConfirm && onDecline && (
        <div className="mt-5 flex h-12 gap-2.5">
          <Button
            theme="primary"
            size="sm"
            className="h-full flex-1"
            onClick={handleConfirm}
            isLoading={loadingType === 'confirm'}
            disabled={isAnyLoading}
          >
            승인하기
          </Button>
          <Button
            theme="secondary"
            size="sm"
            className="h-full flex-1 border-gray-100"
            onClick={() => setIsDeclineDialogOpen(true)}
            isLoading={loadingType === 'decline'}
            disabled={isAnyLoading}
          >
            거절하기
          </Button>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeclineDialogOpen}
        onClose={() => setIsDeclineDialogOpen(false)}
        title="예약을 거절할까요?"
        description="거절 후에는 되돌릴 수 없습니다."
        confirmText="거절하기"
        cancelText="취소"
        onConfirm={handleDeclineConfirm}
      />
    </div>
  );
}
