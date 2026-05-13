'use client';

import { format, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';
import { useAvailableSchedule } from '@/features/reservation/activity-panel/queries/useAvailableSchedule';
import { useMyReservations } from '@/features/reservation/activity-panel/queries/useMyReservations';
import { useUpdateMyReservationApplication } from '@/features/reservation/reservation-list/mutations/useUpdateMyReservationApplication';
import type { MyReservation } from '@/features/reservation/types';
import { ApiError } from '@/shared/apis/apiError';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

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

  const handleChangeReservation = async () => {
    if (!selectedScheduleId) return;

    try {
      await updateMutation.mutateAsync({
        reservationId,
        body: { scheduleId: selectedScheduleId, headCount },
      });
      showToast('check', '예약이 변경되었습니다.');
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 401) {
        showToast('cancel', '로그인을 해주세요.');
        return;
      }
      const message = error instanceof Error ? error.message : '예약 변경에 실패했습니다.';
      showToast('cancel', message);
      throw error;
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
    handleChangeReservation,
  };
};
