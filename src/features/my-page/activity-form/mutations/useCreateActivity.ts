import { useMutation } from '@tanstack/react-query';
import { createActivity } from '@/features/my-page/apis';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: createActivity,
  });
};
