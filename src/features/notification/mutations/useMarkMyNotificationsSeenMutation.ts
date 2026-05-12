import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markMyNotificationsSeen } from '@/features/notification/apis';
import type { GetMyNotificationsParsedResponse } from '@/features/notification/types';

export const useMarkMyNotificationsSeenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMyNotificationsSeen,
    onSuccess: () => {
      const now = Date.now();
      queryClient.setQueriesData<InfiniteData<GetMyNotificationsParsedResponse>>(
        { queryKey: ['my-notifications'] },
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
