import ActivityCardInfo from '@/shared/ui/card/ActivityCardInfo';
import BaseCardImage from '@/shared/ui/card/base/BaseCardImage';
import BaseCardInfo from '@/shared/ui/card/base/BaseCardInfo';
import { cardWrapStyles } from '@/shared/ui/card/cardStyles';
import { cn } from '@/shared/utils/cn';

/**
 * TODO: 임시 타입 정의 (삭제 예정)
 * - 현재 API 응답 구조를 정의하지않아 페이지 기능 구현 시 정의 후 삭제 예정
 */
export type ActivityCardData = {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
};
export type ActivityCardProps = {
  data: ActivityCardData;
};

/**
 * 체험 정보를 표시하는 카드 컴포넌트입니다.
 *
 * 부모 컴포넌트에서 그리드 열 수를 제어하며,
 * 데스크탑에서는 4열, 태블릿에서는 2열로 사용합니다.
 *
 * @example
 * ```tsx
 * <ActivityCard data={activity} />
 *
 * <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
 *   {activities.map((activity) => (
 *     <ActivityCard key={activity.id} data={activity} />
 *   ))}
 * </div>
 * ```
 */
export default function ActivityCard({ data }: ActivityCardProps) {
  const { bannerImageUrl } = data;

  return (
    <div className={cn(cardWrapStyles)}>
      {/* 이미지 */}
      <BaseCardImage
        bannerImageUrl={bannerImageUrl}
        containerClassName="mb-16.5 h-44 md:mb-19 md:h-93.5 lg:h-72.5"
      />

      {/* 정보 영역 */}
      <BaseCardInfo className="absolute bottom-0 p-4 md:px-7.5 md:py-5">
        <ActivityCardInfo data={data} />
      </BaseCardInfo>
    </div>
  );
}
