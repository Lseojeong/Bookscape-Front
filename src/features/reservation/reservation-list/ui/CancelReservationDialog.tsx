'use client';

import { useRouter } from 'next/navigation';
import { useCancelMyReservation } from '@/features/reservation/reservation-list/mutations/useCancelMyReservation';
import { ApiError } from '@/shared/apis/apiError';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type CancelReservationDialogProps = {
  reservationId: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function CancelReservationDialog({
  reservationId,
  isOpen,
  onClose,
}: CancelReservationDialogProps) {
  const router = useRouter();
  const { mutate: cancelReservation } = useCancelMyReservation();
  const { showToast } = useToastStore();

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="예약을 취소하시겠어요?"
      description="취소하면 해당 예약은 즉시 무효 처리됩니다."
      confirmText="취소하기"
      cancelText="아니오"
      onCancel={onClose}
      onConfirm={() => {
        cancelReservation(reservationId, {
          onSuccess: () => {
            showToast('check', '예약이 취소되었습니다.');
          },
          onError: (error) => {
            if (error instanceof ApiError) {
              if (error.status === 401) {
                showToast('cancel', '로그인이 필요합니다.');
                router.push('/login');
                return;
              }
              showToast('cancel', error.message);
              return;
            }

            const message = error instanceof Error ? error.message : '예약 취소에 실패했습니다.';
            showToast('cancel', message);
          },
        });
        onClose();
      }}
    />
  );
}
