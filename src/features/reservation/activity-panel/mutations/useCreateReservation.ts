import { useMutation } from '@tanstack/react-query';
import { createReservation } from '@/features/activity/apis';

export const useCreateReservation = (activityId: number) => {
  return useMutation({
    mutationFn: ({ scheduleId, headCount }: { scheduleId: number; headCount: number }) =>
      createReservation(activityId, { scheduleId, headCount }),
  });
};
