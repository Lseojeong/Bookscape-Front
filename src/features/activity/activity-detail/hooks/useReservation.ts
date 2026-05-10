import { format } from 'date-fns';
import { useState } from 'react';
import { useUserStore } from '@/shared/stores/userStore';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import { useCreateReservation } from '../mutations/useCreateReservation';
import { useActivityDetail } from '../queries/useActivityDetail';
import { useAvailableSchedule } from '../queries/useAvailableSchedule';

export const useReservation = (activityId: number) => {
  const { data } = useActivityDetail(activityId);
  const price = data?.price ?? 0;

  const [selected, setSelected] = useState<Date>();
  const [headCount, setHeadCount] = useState(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>();
  const [month, setMonth] = useState(new Date());

  const year = format(month, 'yyyy');
  const monthStr = format(month, 'MM');

  const { data: availableSchedules } = useAvailableSchedule(activityId, year, monthStr);

  const selectedDateStr = selected ? format(selected, 'yyyy-MM-dd') : null;
  const schedules = availableSchedules?.find((s) => s.date === selectedDateStr)?.times ?? [];

  const { mutate: createReservation } = useCreateReservation(activityId);

  const { showToast } = useToastStore();

  const { user } = useUserStore();

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
        onError: () => {
          showToast('cancel', '예약 신청에 실패했습니다.');
        },
      }
    );
  };

  const isOwner = user?.id === data?.userId;

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
  };
};
