'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CardDefaultImage } from '@/shared/assets/images';
import useDelayedLoading from '@/shared/hooks/useDelayedLoading';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import { cn } from '@/shared/utils/cn';

type BaseCardImageProps = {
  bannerImageUrl?: string;
  alt?: string;
  containerClassName?: string;
  imageClassName?: string;
};

/**
 * 카드(체험/예약)의 배너 이미지를 렌더링하는 공통 컴포넌트입니다.
 *
 * bannerImageUrl이 없거나 이미지 로드에 실패하면 기본 이미지(CardDefaultImage)를 표시합니다.
 * 반드시 부모 요소에 height가 지정되어 있어야 합니다. (fill 사용)
 *
 * @example
 * ```tsx
 * // 체험 카드
 * <BaseCardImage bannerImageUrl="https://example.com/image.jpg" />
 * ```
 */
export default function BaseCardImage({
  bannerImageUrl,
  alt,
  containerClassName,
  imageClassName,
}: BaseCardImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isSkeletonVisible = useDelayedLoading(!isLoaded);

  const src = bannerImageUrl && !hasError ? bannerImageUrl : CardDefaultImage;

  return (
    <div className={cn('relative h-full w-full overflow-hidden', containerClassName)}>
      {!isLoaded && !isSkeletonVisible ? (
        <div className="absolute inset-0 bg-gray-50" />
      ) : !isLoaded && isSkeletonVisible ? (
        <Skeleton className="absolute inset-0" />
      ) : null}
      <Image
        src={src}
        alt={alt ?? '체험 배너 이미지'}
        fill
        className={cn('object-cover', !isLoaded && 'invisible', imageClassName)}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) setHasError(true);
          setIsLoaded(true);
        }}
      />
    </div>
  );
}
