import BaseCardImage from '@/shared/ui/card/base/BaseCardImage';
import BaseCardInfo from '@/shared/ui/card/base/BaseCardInfo';
import BaseCardInfoHeader from '@/shared/ui/card/base/BaseCardInfoHeader';
import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';

/**
 * TODO: 임시 타입 정의 (삭제 예정)
 * - 현재 API 응답 구조를 정의하지않아 페이지 기능 구현 시 정의 후 삭제 예정
 */
export type Activity = {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
};

export type ActivityCardProps = {
  data: Pick<Activity, 'bannerImageUrl' | 'title' | 'reviewCount' | 'rating' | 'price'>;
};

/**
 * 체험 정보를 표시하는 카드 컴포넌트입니다.
 * 사진과 체험명, 리뷰 정보, 가격을 표시합니다.
 *
 * 부모 컴포넌트에서 그리드 열 수를 제어하며,
 * 데스크탑에서는 4열, 태블릿에서는 2열로 사용합니다.
 *
 * @example
 * ```tsx
 * // 단일 사용
 * <ActivityCard data={activity} />
 *
 * // 그리드 목록
 * <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
 *   {activities.map((activity) => (
 *     <ActivityCard key={activity.id} data={activity} />
 *   ))}
 * </div>
 * ```
 */
export default function ActivityCard({ data }: ActivityCardProps) {
  const { bannerImageUrl, title, reviewCount, rating, price } = data;

  return (
    <div className="relative w-full overflow-hidden rounded-[18px] shadow-card">
      <BaseCardImage
        bannerImageUrl={bannerImageUrl}
        containerClassName="mb-16.5 h-44 md:mb-19 md:h-93.5 lg:h-72.5"
      />
      <BaseCardInfo containerClassName="absolute bottom-0 gap-2.5 p-4 md:gap-4.5 md:px-7.5 md:py-5">
        <BaseCardInfoHeader title={title} rating={rating} reviewCount={reviewCount} />
        <PerPersonPrice pricePerPerson={price} />
      </BaseCardInfo>
    </div>
  );
}
