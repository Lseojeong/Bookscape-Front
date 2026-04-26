import Image from 'next/image';
import { cn } from '@/shared/utils/cn';

type BaseCardImageProps = {
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
 * <BaseCardImage bannerImageUrl="https://example.com/image.jpg" />
 * ```
 */
export default function BaseCardImage({
  bannerImageUrl,
  containerClassName,
  imageClassName,
}: BaseCardImageProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', containerClassName)}>
      <Image
        src={bannerImageUrl}
        alt="체험 배너 이미지"
        fill
        unoptimized // TODO : 스토리북에서 미리보기를 위해 임시로 작성, 배포 시 삭제 필요
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
