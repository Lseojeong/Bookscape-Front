import { MyActivityCardProps } from '@/features/my-page/my-activities/ui/MyActivityCard';
import BaseCardInfo from '@/shared/ui/card/base/BaseCardInfo';
import CardActions from '@/shared/ui/card/CardActions';
import { cardInfoStyles } from '@/shared/ui/card/cardStyles';
import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';
import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';
import Title from '@/shared/ui/title/Title';
import { cn } from '@/shared/utils/cn';

/**
 * 내가 등록한 체험 카드의 "정보 영역"을 구성하는 컴포넌트입니다.
 *
 * 오른쪽에 이미지가 겹치는 구조이기 때문에, 텍스트 영역이 이미지와 겹치지 않도록 width를 제한합니다.
 *
 * @example
 * ```tsx
 * <MyActivityCardInfo data={data} />
 * ```
 */
export default function MyActivityCardInfo({ data }: MyActivityCardProps) {
  const { id, title, reviewCount, rating, price } = data;
  return (
    <BaseCardInfo className={cn(cardInfoStyles)}>
      {/* 제목 + 리뷰 요약 */}
      <div className="mb-2.5 flex flex-col gap-1.5 lg:mb-3 lg:gap-2">
        {/* 제목 (길어질 경우 말줄임 처리) */}
        <Title as="h2" size="14" weight="bold" className="truncate lg:typo-18-bold">
          {title}
        </Title>

        {/* 평점 + 리뷰 개수 */}
        <RatingSummary averageRating={rating} totalCount={reviewCount} />
      </div>

      {/* 가격 + 액션 영역 */}
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        {/* 1인당 가격 */}
        <PerPersonPrice pricePerPerson={price} />

        {/* 관리 액션 (수정 / 삭제) */}
        <CardActions type="manage" activityId={id} />
      </div>
    </BaseCardInfo>
  );
}
