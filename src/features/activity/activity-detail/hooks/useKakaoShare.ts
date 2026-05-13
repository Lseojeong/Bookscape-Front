'use client';

import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

export const useKakaoShare = () => {
  const { showToast } = useToastStore();

  const handleKakaoShare = (title: string, description: string, bannerImageUrl: string) => {
    if (!window.Kakao?.isInitialized()) {
      showToast('cancel', '카카오 공유 기능을 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: bannerImageUrl,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '체험 보러가기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return { handleKakaoShare };
};
