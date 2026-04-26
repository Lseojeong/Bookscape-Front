import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';
import Title from '@/shared/ui/title/Title';
import { cn } from '@/shared/utils/cn';

type BaseCardInfoHeader = {
  title: string;
  rating: number;
  reviewCount: number;
  containerClassName?: string;
};
export default function BaseCardInfoHeader({
  title,
  rating,
  reviewCount,
  containerClassName,
}: BaseCardInfoHeader) {
  return (
    <div className={cn('flex flex-col', containerClassName)}>
      <Title as="h3" size="14" weight="bold" className="truncate">
        {title}
      </Title>
      <RatingSummary averageRating={rating} totalCount={reviewCount} />
    </div>
  );
}
