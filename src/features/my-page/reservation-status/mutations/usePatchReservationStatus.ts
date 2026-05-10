import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReservationStatus } from '@/features/my-page/apis';
import type { SellerReservationStatus } from '@/features/my-page/types';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * 내 체험 예약 상태 업데이트 훅 (승인 / 거절)
 *
 * @description
 * 예약 상태를 `confirmed` 또는 `declined`로 변경합니다.
 * 성공 시 관련 예약 목록 쿼리를 무효화하여 최신 데이터를 다시 조회합니다.
 * 실패 시 토스트로 에러 메시지를 표시합니다.
 *
 * @param activityId - 선택된 체험 ID
 * @param onSuccess - 상태 변경 성공 시 호출되는 콜백 (변경된 status 전달)
 */
export const usePatchReservationStatus = (
  activityId: number | null,
  onSuccess?: (status: SellerReservationStatus) => void
) => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: SellerReservationStatus;
    }) => {
      if (!activityId) throw new Error('activityId가 없습니다.');
      return updateReservationStatus(activityId, reservationId, { status });
    },
    onSuccess: async (_, variables) => {
      // 탭 먼저 이동
      onSuccess?.(variables.status);

      // 이후 백그라운드에서 갱신
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['my-activities', activityId, 'reservations'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['my-activities', activityId, 'reserved-schedule'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['my-activities', activityId, 'reservation-dashboard'],
        }),
      ]);
    },
    onError: () => {
      // 예약 상태 변경 실패 시 토스트 표시
      showToast('cancel', '예약 상태 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return { mutateAsync, isPending };
};
