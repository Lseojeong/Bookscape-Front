'use client';

import { KakaoIcon, LinkIcon } from '@/shared/assets/icons';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type ActivityShareProps = {
  title: string;
  description: string;
  bannerImageUrl: string;
};

/**
 * 체험 공유 컴포넌트입니다.
 *
 * URL 복사 및 카카오톡 공유 기능을 제공합니다.
 *
 * @example
 * ```tsx
 * <ActivityShare
 *   title={title}
 *   description={description}
 *   bannerImageUrl={bannerImageUrl}
 * />
 * ```
 */
export default function ActivityShare({ title, description, bannerImageUrl }: ActivityShareProps) {
  const { showToast } = useToastStore();

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('check', 'URL이 복사되었습니다.');
    } catch {
      showToast('cancel', 'URL 복사에 실패했습니다.');
    }
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      showToast('cancel', '카카오 SDK를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY!);
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

  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={handleCopyUrl} aria-label="URL 복사">
        <LinkIcon />
      </button>
      <button
        type="button"
        onClick={handleKakaoShare}
        aria-label="카카오톡 공유"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-kakao-bg"
      >
        <KakaoIcon />
      </button>
    </div>
  );
}
