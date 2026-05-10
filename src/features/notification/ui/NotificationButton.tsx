'use client';

import { cva } from 'class-variance-authority';
import { useRef } from 'react';
import { useNotificationDropdown } from '@/features/notification/hooks/useNotificationDropdown';
import { useDeleteAllMyNotifications } from '@/features/notification/mutations/useDeleteAllMyNotifications';
import { useDeleteMyNotificationMutation } from '@/features/notification/mutations/useDeleteMyNotificationMutation';
import { useMarkMyNotificationsSeenMutation } from '@/features/notification/mutations/useMarkMyNotificationsSeenMutation';
import { useMyNotifications } from '@/features/notification/queries/useMyNotifications';
import { NotificationIcon } from '@/shared/assets/icons';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import type { HeaderTheme } from '@/shared/ui/header/types';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import { cn } from '@/shared/utils/cn';
import Notification from './Notification';

const notificationIconVariants = cva('h-6 w-6', {
  variants: {
    theme: {
      primary: '[&>path]:fill-white',
      light: '',
    },
    isEmpty: {
      true: '[&>rect]:fill-gray-500',
      false: '',
    },
  },
  defaultVariants: {
    theme: 'light',
    isEmpty: false,
  },
});

type NotificationButtonProps = {
  theme?: HeaderTheme;
};

export default function NotificationButton({ theme = 'light' }: NotificationButtonProps) {
  const notificationRef = useRef<HTMLDivElement>(null);

  const { showToast } = useToastStore();

  const { query, notifications, hasNew, lastSeenAtMs, totalCount } = useMyNotifications();
  const markSeenMutation = useMarkMyNotificationsSeenMutation();
  const deleteMutation = useDeleteMyNotificationMutation();
  const { deleteAll } = useDeleteAllMyNotifications();

  const isLoaded = query.isFetched;

  const dropdown = useNotificationDropdown({
    isLoaded,
    hasNotifications: notifications.length > 0,
    lastSeenAtMs,
    markSeen: () => markSeenMutation.mutateAsync(),
    onEmpty: () => showToast('warning', '알림이 없습니다.'),
  });

  useOutsideClick(notificationRef, dropdown.close, dropdown.isOpen);

  const handleDeleteOne = (id: number) => {
    void (async () => {
      try {
        await deleteMutation.mutateAsync(id);
        if (notifications.length === 1) dropdown.close();
      } catch {
        showToast('cancel', '알림 삭제에 실패했습니다.');
      }
    })();
  };

  const handleDeleteAll = async () => {
    await deleteAll({ ids: notifications.map((n) => n.id), onStart: dropdown.close });
  };

  return (
    <div ref={notificationRef} className="relative flex h-6 w-6 items-center justify-center">
      <button type="button" aria-label="알림" onClick={dropdown.toggle}>
        <NotificationIcon
          aria-hidden="true"
          className={cn(
            notificationIconVariants({
              theme,
              isEmpty: !hasNew,
            })
          )}
        />
      </button>
      {dropdown.isOpen && (
        <Notification
          notifications={notifications}
          totalCount={totalCount}
          lastSeenAtMs={dropdown.modalBaseSeenAtMs}
          onDeleteAll={handleDeleteAll}
          onDeleteOne={handleDeleteOne}
          hasNextPage={Boolean(query.hasNextPage)}
          isFetchingNextPage={query.isFetchingNextPage}
          isFetchNextPageError={query.isFetchNextPageError}
          onFetchNextPage={() => query.fetchNextPage()}
        />
      )}
    </div>
  );
}
