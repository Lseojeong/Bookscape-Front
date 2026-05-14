import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useActivityDetail } from '@/features/activity/activity-detail/queries/useActivityDetail';
import type { ActivityDetail } from '@/features/activity/types';
import { useCreateReservation } from '@/features/reservation/activity-panel/mutations/useCreateReservation';
import { useAvailableSchedule } from '@/features/reservation/activity-panel/queries/useAvailableSchedule';
import { useMyReservations } from '@/features/reservation/activity-panel/queries/useMyReservations';
import { ApiError } from '@/shared/apis/apiError';
import { useUserStore } from '@/shared/stores/userStore';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type InitialOptions = {
  initialActivityData?: ActivityDetail;
};

export const useReservation = (
  activityId: number,
  { initialActivityData }: InitialOptions = {}
) => {
  // 외부 훅
  const { data } = useActivityDetail(activityId, initialActivityData);
  const { user } = useUserStore();
  const { showToast } = useToastStore();
  const { mutate: createReservation } = useCreateReservation(activityId);
  const { data: myReservationsData } = useMyReservations();
  const router = useRouter();

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
  const availableDates = availableSchedules?.map((s) => s.date) ?? [];

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
          if (error instanceof ApiError && error.status === 401) {
            showToast('cancel', '로그인을 해주세요.');
            router.push('/login');
            return;
          }
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
    availableDates,
    reset,
    handleReserve,
    isOwner,
    myBlockedScheduleIds,
  };
};
