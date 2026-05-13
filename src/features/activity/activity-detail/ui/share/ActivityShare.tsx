'use client';

import { useCopyUrl } from '@/features/activity/activity-detail/hooks/useCopyUrl';
import { useKakaoShare } from '@/features/activity/activity-detail/hooks/useKakaoShare';
import { KakaoIcon, LinkIcon } from '@/shared/assets/icons';

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
  const { handleCopyUrl } = useCopyUrl();
  const { handleKakaoShare } = useKakaoShare();

  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={handleCopyUrl} aria-label="URL 복사">
        <LinkIcon />
      </button>
      <button
        type="button"
        onClick={() => handleKakaoShare(title, description, bannerImageUrl)}
        aria-label="카카오톡 공유"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-kakao-bg"
      >
        <KakaoIcon />
      </button>
    </div>
  );
}
