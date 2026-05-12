'use client';

import { LinkIcon } from '@/shared/assets/icons';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * 체험 공유 컴포넌트입니다.
 *
 * URL 복사 및 카카오톡 공유 기능을 제공합니다.
 *
 * @example
 * ```tsx
 * <ActivityShare />
 * ```
 */
export default function ActivityShare() {
  const { showToast } = useToastStore();

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    showToast('check', 'URL이 복사되었습니다.');
  };

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={handleCopyUrl} aria-label="URL 복사">
        <LinkIcon />
      </button>
    </div>
  );
}
