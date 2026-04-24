import Image from 'next/image';
import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';

type ActivityCardProps = {
  bannerImageUrl: string;
  title: string;
  reviewCount: number;
  rating: number;
  price: number;
};
/**
 * 체험 정보를 표시하는 카드 컴포넌트입니다.
 * 사진과 체험명, 리뷰 정보, 가격을 보여주며, 클릭 시 상세 페이지로 이동됩니다.
 *
 * @example
 */
export default function ActivityCard({
  bannerImageUrl,
  title,
  reviewCount,
  rating,
  price,
}: ActivityCardProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[18px]">
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
      <div className="absolute bottom-0 flex w-full flex-col gap-2.5 rounded-[18px] bg-white p-4 sm:gap-4.5">
        <div className="flex flex-col gap-1">
          <p className="typo-14-semibold truncate">{title}</p>
          <RatingSummary averageRating={rating} totalCount={reviewCount} />
        </div>
        {/* TODO : PricePerPerson 컴포넌트로 교체 필요 */}
        <span className="typo-15-bold">₩ {price} / 인</span>
      </div>
    </div>
  );
}
