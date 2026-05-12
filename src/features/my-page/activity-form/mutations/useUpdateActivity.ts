import { useMutation } from '@tanstack/react-query';
import type { UpdateMyActivityRequestBody } from '@/features/my-page/activity-form/types';
import { updateMyActivity } from '@/features/my-page/apis';

export const useUpdateActivity = (id: number) => {
  return useMutation({
    mutationFn: (data: UpdateMyActivityRequestBody) => updateMyActivity(id, data),
  });
};
