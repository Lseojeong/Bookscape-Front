import Image from 'next/image';
import { cn } from '@/shared/utils/cn';

type ActivityCardImageProps = {
  bannerImageUrl: string;
  containerClassName?: string;
  imageClassName?: string;
};

/**
 * 체험/예약 카드의 배너 이미지 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * // 체험 카드
 * <ActivityCardImage bannerImageUrl="https://example.com/image.jpg" />
 * ```
 */
export default function ActivityCardImage({
  bannerImageUrl,
  containerClassName,
  imageClassName,
}: ActivityCardImageProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', containerClassName)}>
      <Image
        src={bannerImageUrl}
        alt="체험 배너 이미지"
        fill
        priority
        unoptimized
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
