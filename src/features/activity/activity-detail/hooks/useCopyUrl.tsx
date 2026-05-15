'use client';

import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

export const useCopyUrl = () => {
  const { showToast } = useToastStore();

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('check', 'URL이 복사되었습니다.');
    } catch {
      showToast('cancel', 'URL 복사에 실패했습니다.');
    }
  };

  return { handleCopyUrl };
};
