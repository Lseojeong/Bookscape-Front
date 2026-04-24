import Image from 'next/image';

type ActivityCardImageProps = {
  bannerImageUrl: string;
};

/**
 * 체험 카드의 배너 이미지 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ActivityCardImage bannerImageUrl="https://example.com/image.jpg" />
 * ```
 */
export default function ActivityCardImage({ bannerImageUrl }: ActivityCardImageProps) {
  return (
    <div className="relative mb-16.5 h-44 w-full overflow-hidden">
      <Image
        src={bannerImageUrl}
        alt="체험 배너"
        fill
        priority
        unoptimized
        className="object-cover"
      />
    </div>
  );
}
