import { format } from 'date-fns';
import { useState } from 'react';
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
  };
};
