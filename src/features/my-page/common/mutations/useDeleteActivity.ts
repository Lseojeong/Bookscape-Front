import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivity } from '@/features/my-page/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteActivity(activityId),
    onSettled: async (_data, _error, activityId) => {
      queryClient.removeQueries({ queryKey: [...QUERY_KEYS.MY_ACTIVITIES_BASE(), activityId] });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_ACTIVITIES_BASE() });
    },
  });
};
