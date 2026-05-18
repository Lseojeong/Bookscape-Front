import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyNotification } from '@/features/notification/apis';
import type { GetMyNotificationsParsedResponse } from '@/features/notification/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

export const useDeleteMyNotificationMutation = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.user?.id);
  const myNotificationsQueryKey = QUERY_KEYS.MY_NOTIFICATIONS_BASE();

  return useMutation({
    mutationFn: deleteMyNotification,
    onMutate: async (notificationId) => {
      if (!userId) return;

      await queryClient.cancelQueries({ queryKey: myNotificationsQueryKey });

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<GetMyNotificationsParsedResponse>
      >({
        queryKey: myNotificationsQueryKey,
      });

      queryClient.setQueriesData<InfiniteData<GetMyNotificationsParsedResponse>>(
        { queryKey: myNotificationsQueryKey },
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
      if (!userId) return;
      void queryClient.invalidateQueries({ queryKey: myNotificationsQueryKey });
    },
  });
};
