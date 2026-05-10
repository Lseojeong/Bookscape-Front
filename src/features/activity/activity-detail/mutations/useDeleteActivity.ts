import { useMutation } from '@tanstack/react-query';
import { deleteActivity } from '@/features/activity/apis';

export const useDeleteActivity = () => {
  return useMutation({
    mutationFn: (id: number) => deleteActivity(id),
  });
};
