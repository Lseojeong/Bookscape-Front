import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReservationStatus } from '@/features/my-page/apis';
import type { PatchableReservationStatus } from '@/features/my-page/types';

/**
 * 내 체험 예약 상태 업데이트 훅 (승인 / 거절)
 *
 * @description
 * 예약 상태를 `confirmed` 또는 `declined`로 변경합니다.
 * 성공 시 관련 예약 목록 쿼리를 무효화하여 최신 데이터를 다시 조회합니다.
 *
 * @param activityId - 선택된 체험 ID
 * @param scheduleIds - 현재 날짜의 전체 스케줄 ID 목록 (쿼리 무효화 대상)
 */
export const usePatchReservationStatus = (activityId: number | null, scheduleIds: number[]) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: PatchableReservationStatus;
    }) => updateReservationStatus(activityId!, reservationId, { status }),
    onSuccess: () => {
      // 예약 목록 쿼리 무효화
      scheduleIds.forEach((scheduleId) => {
        queryClient.invalidateQueries({
          queryKey: ['my-activities', activityId, 'reservations', scheduleId],
        });
      });

      // 달력 뱃지 쿼리 무효화 ← 추가
      queryClient.invalidateQueries({
        queryKey: ['my-activities', activityId, 'reservation-dashboard'],
      });
    },
  });

  return { mutateAsync, isPending };
};
