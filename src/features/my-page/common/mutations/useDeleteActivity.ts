import { useMutation } from '@tanstack/react-query';
import { deleteActivity } from '@/features/my-page/apis';

export const useDeleteActivity = () => {
  return useMutation({
    mutationFn: (id: number) => deleteActivity(id),
  });
};
