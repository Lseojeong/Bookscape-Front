import BaseCardInfo from '@/shared/ui/card/base/BaseCardInfo';
import BaseCardInfoHeader from '@/shared/ui/card/base/BaseCardInfoHeader';
import CardActions from '@/shared/ui/card/CardActions';
import { MyActivityCardProps } from '@/shared/ui/card/my-activity-card/MyActivityCard';
import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';

export default function MyActivityCardInfo({ data }: MyActivityCardProps) {
  const { title, reviewCount, rating, price } = data;
  return (
    <BaseCardInfo containerClassName=" flex flex-col gap-2.5 lg:gap-3 relative z-10 mr-26.75 w-[calc(100%-107px)] rounded-3xl px-10 py-7.5">
      <BaseCardInfoHeader
        title={title}
        rating={rating}
        reviewCount={reviewCount}
        containerClassName="gap-1.5 lg:gap-2"
      />
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        <PerPersonPrice pricePerPerson={price} />
        <CardActions status="confirmed" />
      </div>
    </BaseCardInfo>
  );
}
