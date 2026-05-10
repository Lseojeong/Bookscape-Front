'use client';

import { cva } from 'class-variance-authority';
import { useEffect, useRef, useState } from 'react';
import {
  deleteMyNotification,
  getMyNotifications,
  markMyNotificationsSeen,
} from '@/features/notification/apis';
import type { ParsedNotification } from '@/features/notification/types';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<ParsedNotification[]>([]);
  const [hasNew, setHasNew] = useState(false);
  const [lastSeenAtMs, setLastSeenAtMs] = useState<number | null>(null);
  const [modalBaseSeenAtMs, setModalBaseSeenAtMs] = useState<number | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useOutsideClick(notificationRef, () => setIsModalOpen(false), isModalOpen);
  const { showToast } = useToastStore();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getMyNotifications({ size: 20 });
        if (cancelled) return;
        setNotifications(data?.notifications ?? []);
        setHasNew(Boolean(data?.hasNew));
        setLastSeenAtMs(data?.lastSeenAtMs ?? null);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDeleteOne = (id: number) => {
    void (async () => {
      try {
        await deleteMyNotification(id);
        setNotifications((prev) => {
          const next = prev.filter((n) => n.id !== id);
          if (prev.length === 1) setIsModalOpen(false);
          return next;
        });
      } catch {
        showToast('cancel', '알림 삭제에 실패했습니다.');
      }
    })();
  };

  const handleDeleteAll = async () => {
    setIsModalOpen(false);
    const ids = notifications.map((n) => n.id);
    const results = await Promise.allSettled(ids.map((id) => deleteMyNotification(id)));

    const succeededIds = results
      .map((r, index) => (r.status === 'fulfilled' ? ids[index] : null))
      .filter((v): v is number => v !== null);

    setNotifications((prev) => prev.filter((n) => !succeededIds.includes(n.id)));

    if (succeededIds.length === ids.length) {
      showToast('check', '모든 알림을 성공적으로 삭제했습니다.');
      return;
    }

    showToast('warning', '일부 알림 삭제에 실패했습니다.');
  };

  const handleClick = () => {
    if (!isLoaded) return;
    if (notifications.length === 0) {
      showToast('warning', '알림이 없습니다.');
      return;
    }
    const willOpen = !isModalOpen;
    if (willOpen) {
      // 모달에서 '읽음/안읽음' 구분은 열기 직전 기준으로 고정합니다.
      setModalBaseSeenAtMs(lastSeenAtMs);
      // 모달을 열 때 '확인함' 처리 (BFF + 쿠키)
      setHasNew(false);
      void (async () => {
        try {
          await markMyNotificationsSeen();
          // UI 분리 기준은 유지하고, 다음 열람부터 적용되도록만 업데이트합니다.
          setLastSeenAtMs(Date.now());
        } catch {
          // 확인 처리 실패는 UX에 큰 영향이 없어 무시합니다.
        }
      })();
    } else {
      setModalBaseSeenAtMs(null);
    }
    setIsModalOpen(willOpen);
  };

  return (
    <div ref={notificationRef} className="relative flex h-6 w-6 items-center justify-center">
      <button type="button" aria-label="알림" onClick={handleClick}>
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
      {isModalOpen && (
        <Notification
          notifications={notifications}
          lastSeenAtMs={modalBaseSeenAtMs}
          onDeleteAll={handleDeleteAll}
          onDeleteOne={handleDeleteOne}
        />
      )}
    </div>
  );
}
