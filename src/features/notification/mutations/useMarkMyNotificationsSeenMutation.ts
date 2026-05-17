import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markMyNotificationsSeen } from '@/features/notification/apis';
import type { GetMyNotificationsParsedResponse } from '@/features/notification/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

export const useMarkMyNotificationsSeenMutation = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.user?.id);

  return useMutation({
    mutationFn: markMyNotificationsSeen,
    onSuccess: () => {
      if (!userId) return;
      const now = Date.now();
      queryClient.setQueriesData<InfiniteData<GetMyNotificationsParsedResponse>>(
        { queryKey: QUERY_KEYS.MY_NOTIFICATIONS_BASE() },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index !== 0) return page;
              return { ...page, hasNew: false, lastSeenAtMs: now };
            }),
          };
        }
      );
    },
  });
};
