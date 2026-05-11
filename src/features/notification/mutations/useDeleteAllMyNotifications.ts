import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { deleteMyNotification } from '@/features/notification/apis';
import type { GetMyNotificationsParsedResponse } from '@/features/notification/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type UseDeleteAllMyNotificationsParams = {
  /** 전체 삭제할 알림 id 목록 */
  ids: number[];
  /** 삭제 시작 시 실행 (예: 모달 닫기) */
  onStart?: () => void;
};

export const useDeleteAllMyNotifications = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const deleteAll = useCallback(
    async ({ ids, onStart }: UseDeleteAllMyNotificationsParams) => {
      if (ids.length === 0) return;

      const myNotificationsQueryKey = QUERY_KEYS.MY_NOTIFICATIONS_BASE();

      onStart?.();

      await queryClient.cancelQueries({
        queryKey: myNotificationsQueryKey,
      });

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<GetMyNotificationsParsedResponse>
      >({
        queryKey: myNotificationsQueryKey,
      });

      queryClient.setQueriesData<InfiniteData<GetMyNotificationsParsedResponse>>(
        {
          queryKey: myNotificationsQueryKey,
        },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) => ({
              ...page,
              totalCount: index === 0 ? Math.max(0, page.totalCount - ids.length) : page.totalCount,
              notifications: page.notifications.filter(
                (notification) => !ids.includes(notification.id)
              ),
            })),
          };
        }
      );

      const results = await Promise.allSettled(ids.map((id) => deleteMyNotification(id)));

      const succeededCount = results.filter((result) => result.status === 'fulfilled').length;

      if (succeededCount === ids.length) {
        showToast('check', '모든 알림을 성공적으로 삭제했습니다.');
      } else {
        // 일부 실패면 이전 스냅샷으로 롤백 후 invalidate로 동기화
        previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });

        showToast('cancel', '일부 알림 삭제에 실패했습니다.');
      }

      void queryClient.invalidateQueries({
        queryKey: myNotificationsQueryKey,
      });
    },
    [queryClient, showToast]
  );

  return { deleteAll };
};
