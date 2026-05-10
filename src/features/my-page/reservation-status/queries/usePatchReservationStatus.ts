import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReservationStatus } from '@/features/my-page/apis';
import type { SellerReservationStatus } from '@/features/my-page/types';

/**
 * 내 체험 예약 상태 업데이트 훅 (승인 / 거절)
 *
 * @description
 * 예약 상태를 `confirmed` 또는 `declined`로 변경합니다.
 * 성공 시 관련 예약 목록 쿼리를 무효화하여 최신 데이터를 다시 조회합니다.
 *
 */
export const usePatchReservationStatus = (
  activityId: number | null,
  onSuccess?: (status: SellerReservationStatus) => void
) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: SellerReservationStatus;
    }) => updateReservationStatus(activityId!, reservationId, { status }),
    onSuccess: (_, variables) => {
      // 예약 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ['my-activities', activityId, 'reservations'],
      });
      // 탭 카운트 갱신
      queryClient.invalidateQueries({
        queryKey: ['my-activities', activityId, 'reserved-schedule'],
      });
      // 달력 뱃지 갱신
      queryClient.invalidateQueries({
        queryKey: ['my-activities', activityId, 'reservation-dashboard'],
      });
      // 변경된 status 탭으로 이동
      onSuccess?.(variables.status);
    },
  });

  return { mutateAsync, isPending };
};
