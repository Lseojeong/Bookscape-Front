import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivity } from '@/features/my-page/apis';
import type { GetMyActivitiesResponse } from '@/features/my-page/types';

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteActivity(activityId),
    onMutate: async (activityId) => {
      await queryClient.cancelQueries({ queryKey: ['my-activities'] });

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<GetMyActivitiesResponse, number | undefined>
      >({ queryKey: ['my-activities'] });

      queryClient.setQueriesData<
        InfiniteData<GetMyActivitiesResponse, number | undefined> | undefined
      >({ queryKey: ['my-activities', 'infinite'] }, (old) => {
        if (!old) return old;

        const nextPages = old.pages.map((page) => {
          const activities = (page.activities ?? []).filter((a) => a.id !== activityId);
          const removedCount = (page.activities?.length ?? 0) - activities.length;
          const totalCount = Math.max(0, (page.totalCount ?? 0) - removedCount);
          return { ...page, activities, totalCount };
        });

        return { ...old, pages: nextPages };
      });

      queryClient.removeQueries({ queryKey: ['my-activities', activityId] });

      return { previousQueries };
    },
    onError: (_error, _activityId, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey as QueryKey, data);
      });
    },
    onSettled: (_data, _error, activityId) => {
      queryClient.removeQueries({ queryKey: ['my-activities', activityId] });
      queryClient.invalidateQueries({ queryKey: ['my-activities'] });
    },
  });
};
