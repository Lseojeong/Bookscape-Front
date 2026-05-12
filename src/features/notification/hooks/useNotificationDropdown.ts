import { useCallback, useState } from 'react';

type UseNotificationDropdownParams = {
  /** 데이터가 로드되었는지 (로드 전이면 클릭 무시) */
  isLoaded: boolean;
  /** 알림 존재 여부 (없으면 onEmpty 실행) */
  hasNotifications: boolean;
  /** 새 알림 존재 여부 (false면 markSeen 호출 생략) */
  hasNew: boolean;
  /** 모달 열기 직전 기준(lastSeen) */
  lastSeenAtMs: number | null;
  /** 알림 확인 처리 */
  markSeen: () => Promise<void>;
  /** 알림 없을 때 실행 */
  onEmpty: () => void;
};

export const useNotificationDropdown = ({
  isLoaded,
  hasNotifications,
  hasNew,
  lastSeenAtMs,
  markSeen,
  onEmpty,
}: UseNotificationDropdownParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalBaseSeenAtMs, setModalBaseSeenAtMs] = useState<number | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setModalBaseSeenAtMs(null);
  }, []);

  const open = useCallback(() => {
    if (!isLoaded) return;
    if (!hasNotifications) {
      onEmpty();
      return;
    }
    setModalBaseSeenAtMs(lastSeenAtMs);
    setIsOpen(true);
    if (hasNew) {
      void markSeen().catch(() => {
        // 확인 처리 실패는 UX에 큰 영향이 없어 무시합니다.
      });
    }
  }, [hasNew, hasNotifications, isLoaded, lastSeenAtMs, markSeen, onEmpty]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
      return;
    }
    open();
  }, [close, isOpen, open]);

  return { isOpen, open, close, toggle, modalBaseSeenAtMs };
};
