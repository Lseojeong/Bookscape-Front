'use client';

import { format, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';
import { useAvailableSchedule } from '@/features/reservation/activity-panel/queries/useAvailableSchedule';
import { useMyReservations } from '@/features/reservation/activity-panel/queries/useMyReservations';
import { useUpdateMyReservationApplication } from '@/features/reservation/reservation-list/mutations/useUpdateMyReservationApplication';
import type { MyReservation } from '@/features/reservation/types';
import { ApiError } from '@/shared/apis/apiError';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * ## useReservationChange
 *
 * 예약 변경(신청 변경) UI에서 사용하는 상태/데이터/액션을 제공하는 훅입니다.
 *
 * @remarks
 * - 캘린더/시간대/인원 선택에 필요한 상태를 보관합니다.
 * - 예약 변경 요청을 수행하고, 성공/실패 토스트를 표시합니다.
 * - `submit()`은 성공 여부만 `boolean`으로 반환하며(throw 하지 않음),
 *   overlay 닫기/step 초기화는 UI 컨테이너에서 처리합니다.
 *
 * @param reservation 변경 대상 예약
 */
export const useReservationChange = (reservation: MyReservation) => {
  const activityId = reservation.activity.id;
  const reservationId = reservation.id;
  const { showToast } = useToastStore();

  const initialDate = useMemo(() => parseISO(reservation.date), [reservation.date]);
  const [selected, setSelected] = useState<Date | undefined>(initialDate);
  const [headCount, setHeadCount] = useState(reservation.headCount);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | undefined>(
    reservation.scheduleId
  );
  const [month, setMonth] = useState<Date>(initialDate);

  const year = format(month, 'yyyy');
  const monthStr = format(month, 'MM');

  const { data: availableSchedules } = useAvailableSchedule(activityId, year, monthStr);
  const { data: myReservationsData } = useMyReservations();
  const updateMutation = useUpdateMyReservationApplication();

  const selectedDateStr = selected ? format(selected, 'yyyy-MM-dd') : null;
  const schedules = availableSchedules?.find((s) => s.date === selectedDateStr)?.times ?? [];
  const availableDates = availableSchedules?.map((s) => s.date) ?? [];

  const myBlockedScheduleIds = useMemo(() => {
    const blocked = myReservationsData?.reservations
      .filter((r) => (r.status === 'pending' || r.status === 'confirmed') && r.id !== reservationId)
      .map((r) => r.scheduleId);
    return new Set(blocked ?? []);
  }, [myReservationsData, reservationId]);

  const reset = () => {
    setSelected(initialDate);
    setSelectedScheduleId(reservation.scheduleId);
    setHeadCount(reservation.headCount);
    setMonth(initialDate);
  };

  /**
   * 예약 변경 API를 호출합니다.
   *
   * @returns 성공 시 `true`, 실패(검증 실패/401 포함) 시 `false`
   */
  const submit = async (): Promise<boolean> => {
    if (!selectedScheduleId) return false;
    const optimisticSchedule = schedules.find((s) => s.id === selectedScheduleId);
    try {
      await updateMutation.mutateAsync({
        reservationId,
        body: { scheduleId: selectedScheduleId, headCount },
        optimistic: {
          date: selectedDateStr ?? undefined,
          startTime: optimisticSchedule?.startTime,
          endTime: optimisticSchedule?.endTime,
        },
      });
      showToast('check', '예약이 변경되었습니다.');
      return true;
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 401) {
        showToast('cancel', '로그인을 해주세요.');
        return false;
      }
      const message = error instanceof Error ? error.message : '예약 변경에 실패했습니다.';
      showToast('cancel', message);
      return false;
    }
  };

  return {
    reservationId,
    activityId,
    selected,
    setSelected,
    headCount,
    setHeadCount,
    selectedScheduleId,
    setSelectedScheduleId,
    month,
    setMonth,
    schedules,
    availableDates,
    myBlockedScheduleIds,
    isUpdating: updateMutation.isPending,
    reset,
    submit,
  };
};
