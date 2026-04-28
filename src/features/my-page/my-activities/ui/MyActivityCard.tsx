import BaseCardImage from '@/shared/ui/card/base/BaseCardImage';
import { cardImageStyles, cardWrapStyles } from '@/shared/ui/card/cardStyles';
import MyActivityCardInfo from '@/shared/ui/card/MyActivityCardInfo';
import { cn } from '@/shared/utils/cn';

/**
 * MyActivityCard에서 사용하는 데이터 타입
 * - Activity 전체 타입에 의존하지 않고 필요한 값만 명시적으로 정의
 * - 추후 API 변경 시 영향 범위를 줄이기 위함
 */
export type MyActivityCardData = {
  id: number;
  title: string;
  reviewCount: number;
  rating: number;
  price: number;
  bannerImageUrl?: string;
};

export type MyActivityCardProps = {
  data: MyActivityCardData;
};

/**
 * 내가 등록한 체험 정보를 표시하는 카드 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <MyActivityCard data={activity} />
 * ```
 */
export default function MyActivityCard({ data }: MyActivityCardProps) {
  const { title } = data;

  return (
    <div className={cn('flex items-center rounded-3xl', cardWrapStyles)}>
      {/* 이미지 영역 */}
      <BaseCardImage alt={title} containerClassName={cardImageStyles} />

      {/* 정보 영역 */}
      <div className="relative layer-base w-full">
        <MyActivityCardInfo data={data} />
      </div>
    </div>
  );
}
