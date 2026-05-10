import { useCallback } from 'react';
import { useDeleteMyNotificationMutation } from '@/features/notification/mutations/useDeleteMyNotificationMutation';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type UseDeleteAllMyNotificationsParams = {
  /** 전체 삭제할 알림 id 목록 */
  ids: number[];
  /** 삭제 시작 시 실행 (예: 모달 닫기) */
  onStart?: () => void;
};

export const useDeleteAllMyNotifications = () => {
  const deleteMutation = useDeleteMyNotificationMutation();
  const { showToast } = useToastStore();

  const deleteAll = useCallback(
    async ({ ids, onStart }: UseDeleteAllMyNotificationsParams) => {
      if (ids.length === 0) return;
      onStart?.();

      const results = await Promise.allSettled(ids.map((id) => deleteMutation.mutateAsync(id)));
      const succeeded = results.filter((r) => r.status === 'fulfilled').length;

      if (succeeded === ids.length) {
        showToast('check', '모든 알림을 성공적으로 삭제했습니다.');
        return;
      }

      showToast('cancel', '일부 알림 삭제에 실패했습니다.');
    },
    [deleteMutation, showToast]
  );

  return { deleteAll, deleteMutation };
};
