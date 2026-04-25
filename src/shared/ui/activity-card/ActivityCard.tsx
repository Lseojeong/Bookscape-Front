import ActivityCardImage from '@/shared/ui/activity-card/ActivityCardImage';
import ActivityCardInfo from '@/shared/ui/activity-card/ActivityCardInfo';

/**
 * TODO: 임시 타입 정의 (삭제 예정)
 * - 현재 API 응답 구조를 정의하지않아 페이지 기능 구현 시 정의 후 삭제 예정
 */
type Activity = {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
};

/**
 * 카드에 필요한 데이터를 개별 props로 나누지 않고
 * data 객체로 전달한 뒤, 자식 컴포넌트에서 필요한 값만 선택해서 사용
 */
type ActivityCardProps = {
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
      <ActivityCardImage
        bannerImageUrl={bannerImageUrl}
        containerClassName="mb-16.5 h-44 md:mb-19 md:h-93.5 lg:h-72.5"
      />
      <ActivityCardInfo
        title={title}
        rating={rating}
        reviewCount={reviewCount}
        price={price}
        containerClassName="gap-2.5 p-4 md:gap-4.5 md:px-7.5 md:py-5 lg:gap-6"
      />
    </div>
  );
}
