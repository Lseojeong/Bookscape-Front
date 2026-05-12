import { useMutation } from '@tanstack/react-query';
import { updateMyActivity } from '@/features/my-page/apis';
import type { UpdateMyActivityRequestBody } from '@/features/my-page/types';

export const useUpdateActivity = (id: number) => {
  return useMutation({
    mutationFn: (data: UpdateMyActivityRequestBody) => updateMyActivity(id, data),
  });
};
