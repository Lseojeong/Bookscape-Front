import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivity } from '@/features/my-page/apis';
import type { GetMyActivitiesResponse } from '@/features/my-page/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteActivity(activityId),
    onMutate: async (activityId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MY_ACTIVITIES_INFINITE_BASE() });

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<GetMyActivitiesResponse, number | undefined>
      >({ queryKey: QUERY_KEYS.MY_ACTIVITIES_INFINITE_BASE() });

      queryClient.setQueriesData<
        InfiniteData<GetMyActivitiesResponse, number | undefined> | undefined
      >({ queryKey: QUERY_KEYS.MY_ACTIVITIES_INFINITE_BASE() }, (old) => {
        if (!old) return old;

        const nextPages = old.pages.map((page) => {
          const activities = (page.activities ?? []).filter((a) => a.id !== activityId);
          const removedCount = (page.activities?.length ?? 0) - activities.length;
          const totalCount = Math.max(0, (page.totalCount ?? 0) - removedCount);
          return { ...page, activities, totalCount };
        });

        return { ...old, pages: nextPages };
      });

      queryClient.removeQueries({ queryKey: [...QUERY_KEYS.MY_ACTIVITIES_BASE(), activityId] });

      return { previousQueries };
    },
    onError: (_error, _activityId, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey as QueryKey, data);
      });
    },
    onSettled: (_data, _error, activityId) => {
      queryClient.removeQueries({ queryKey: [...QUERY_KEYS.MY_ACTIVITIES_BASE(), activityId] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_ACTIVITIES_BASE() });
    },
  });
};
