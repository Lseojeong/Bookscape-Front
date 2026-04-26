import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';
import Title from '@/shared/ui/title/Title';
import { cn } from '@/shared/utils/cn';

type BaseCardInfoHeader = {
  title: string;
  rating: number;
  reviewCount: number;
  className?: string;
};

/**
 * 카드 정보 영역의 "헤더"를 구성하는 공통 컴포넌트입니다.
 *
 * 제목 (Title)과 리뷰 요약 (RatingSummary)으로 구성했습니다.
 *
 *
 * - 부모가 flex 환경일 경우 텍스트 overflow 방지를 위해
 * 필요 시 `min-w-0`를 부모 또는 className으로 추가해야 합니다.
 *
 * @example
 * ```tsx
 * <BaseCardInfoHeader
 *   title="함께 배우는 스트릿 댄스"
 *   rating={4.8}
 *   reviewCount={12}
 * />
 * ```
 */
export default function BaseCardInfoHeader({
  title,
  rating,
  reviewCount,
  className,
}: BaseCardInfoHeader) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* 제목 (길어질 경우 말줄임 처리) */}
      <Title as="h3" size="14" weight="bold" className="truncate lg:typo-18-bold">
        {title}
      </Title>

      {/* 평점 + 리뷰 개수 */}
      <RatingSummary averageRating={rating} totalCount={reviewCount} />
    </div>
  );
}
