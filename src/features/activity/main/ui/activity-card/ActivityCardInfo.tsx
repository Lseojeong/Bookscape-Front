import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';
import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';
import Title, { TitleAs } from '@/shared/ui/title/Title';

type ActivityCardInfo = {
  data: {
    title: string;
    reviewCount: number;
    rating: number;
    price: number;
  };
  titleTag?: TitleAs;
};

/**
 * 체험 카드 컴포넌트입니다.
 * 메인 페이지 및 검색 페이지에서 사용합니다.
 *
 * @example
 * ```tsx
 * <ActivityCardInfo data={data} />
 * ```
 */
export default function ActivityCardInfo({ data, titleTag = 'h3' }: ActivityCardInfo) {
  const { title, reviewCount, rating, price } = data;
  return (
    <div className="flex flex-col gap-2.5 md:gap-4.5">
      {/* 체험명 + 리뷰 요약 */}
      <div className="flex flex-col">
        {/* 제목 (길어질 경우 말줄임 처리) */}
        <Title as={titleTag} size="14" weight="semibold" className="truncate md:typo-18-semibold">
          {title}
        </Title>

        {/* 평점 + 리뷰 개수 */}
        <RatingSummary averageRating={rating} totalCount={reviewCount} />
      </div>

      {/* 1인당 가격 */}
      <PerPersonPrice pricePerPerson={price} />
    </div>
  );
}
