import BaseCardInfo from '@/shared/ui/card/base/BaseCardInfo';
import BaseCardInfoHeader from '@/shared/ui/card/base/BaseCardInfoHeader';
import CardActions from '@/shared/ui/card/CardActions';
import { MyActivityCardProps } from '@/shared/ui/card/my-activity-card/MyActivityCard';
import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';

/**
 * 내가 등록한 체험 카드의 "정보 영역"을 구성하는 컴포넌트입니다.
 *
 * 오른쪽에 이미지가 겹치는 구조이기 때문에, 텍스트 영역이 이미지와 겹치지 않도록 width를 제한합니다.
 *
 * @example
 * ```tsx
 * <MyActivityCardInfo
 *   data={{
 *     title: '한강에서 즐기는 요트 체험',
 *     reviewCount: 24,
 *     rating: 4.8,
 *     price: 35000,
 *   }}
 * />
 * ```
 */
export default function MyActivityCardInfo({ data }: MyActivityCardProps) {
  const { title, reviewCount, rating, price } = data;
  return (
    <BaseCardInfo
      /**
       * - w-[calc(100%-107px)]: 오른쪽 이미지 영역을 제외한 너비 확보
       * - mr-26.75: 이미지와 겹치지 않도록 오른쪽 여백 확보
       * - px / py: 내부 여백
       */
      className="mr-26.75 flex w-[calc(100%-107px)] flex-col gap-2.5 rounded-3xl px-5 py-5 lg:gap-3 lg:px-10 lg:py-7.5"
    >
      {/* 제목 + 리뷰 요약 */}
      <BaseCardInfoHeader
        title={title}
        rating={rating}
        reviewCount={reviewCount}
        className="mb-2.5 gap-1.5 lg:mb-3 lg:gap-2"
      />

      {/* 가격 + 액션 영역 */}
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        {/* 1인당 가격 */}
        <PerPersonPrice pricePerPerson={price} />

        {/* 관리 액션 (수정 / 삭제) */}
        <CardActions type="manage" />
      </div>
    </BaseCardInfo>
  );
}
