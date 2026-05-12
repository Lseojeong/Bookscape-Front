import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyNotification } from '@/features/notification/apis';
import type { GetMyNotificationsParsedResponse } from '@/features/notification/types';

export const useDeleteMyNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyNotification,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ['my-notifications'] });

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<GetMyNotificationsParsedResponse>
      >({
        queryKey: ['my-notifications'],
      });

      queryClient.setQueriesData<InfiniteData<GetMyNotificationsParsedResponse>>(
        { queryKey: ['my-notifications'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, index) => ({
              ...page,
              totalCount: index === 0 ? Math.max(0, page.totalCount - 1) : page.totalCount,
              notifications: page.notifications.filter((n) => n.id !== notificationId),
            })),
          };
        }
      );

      return { previousQueries };
    },
    onError: (_error, _notificationId, context) => {
      context?.previousQueries?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    // onMutate에서 이미 낙관적 업데이트를 수행합니다.
    onSuccess: () => {},
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });
};
