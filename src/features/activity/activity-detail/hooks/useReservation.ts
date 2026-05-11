import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { useCreateReservation } from '@/features/activity/activity-detail/mutations/useCreateReservation';
import { useActivityDetail } from '@/features/activity/activity-detail/queries/useActivityDetail';
import { useAvailableSchedule } from '@/features/activity/activity-detail/queries/useAvailableSchedule';
import { useUserStore } from '@/shared/stores/userStore';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import { useMyReservations } from '../queries/useMyReservations';

export const useReservation = (activityId: number) => {
  // 외부 훅
  const { data } = useActivityDetail(activityId);
  const { user } = useUserStore();
  const { showToast } = useToastStore();
  const { mutate: createReservation } = useCreateReservation(activityId);
  const { data: myReservationsData } = useMyReservations();

  // 상태
  const [selected, setSelected] = useState<Date>();
  const [headCount, setHeadCount] = useState(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>();
  const [month, setMonth] = useState(new Date());

  // 파생 값
  const price = data?.price ?? 0;
  const isOwner = user?.id === data?.userId;
  const year = format(month, 'yyyy');
  const monthStr = format(month, 'MM');

  // 파생 훅
  const { data: availableSchedules } = useAvailableSchedule(activityId, year, monthStr);

  // 파생 값
  const selectedDateStr = selected ? format(selected, 'yyyy-MM-dd') : null;
  const schedules = availableSchedules?.find((s) => s.date === selectedDateStr)?.times ?? [];
  const myBlockedScheduleIds = useMemo(
    () =>
      new Set(
        myReservationsData?.reservations
          .filter((r) => r.status === 'pending' || r.status === 'confirmed')
          .map((r) => r.scheduleId) ?? []
      ),
    [myReservationsData]
  );

  const reset = () => {
    setSelected(undefined);
    setSelectedScheduleId(undefined);
    setHeadCount(1);
    setMonth(new Date());
  };

  const handleReserve = () => {
    if (!selectedScheduleId) return;
    createReservation(
      { scheduleId: selectedScheduleId, headCount },
      {
        onSuccess: () => {
          showToast('check', '예약이 신청되었습니다.');
          reset();
        },
        onError: (error: unknown) => {
          const message = error instanceof Error ? error.message : '예약 신청에 실패했습니다.';
          showToast('cancel', message);
        },
      }
    );
  };

  return {
    price,
    selected,
    setSelected,
    headCount,
    setHeadCount,
    selectedScheduleId,
    setSelectedScheduleId,
    month,
    setMonth,
    schedules,
    reset,
    handleReserve,
    isOwner,
    myBlockedScheduleIds,
  };
};
