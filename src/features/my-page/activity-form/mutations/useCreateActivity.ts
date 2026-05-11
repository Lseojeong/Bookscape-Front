import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivity } from '@/features/my-page/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_ACTIVITIES() });
    },
  });
};
