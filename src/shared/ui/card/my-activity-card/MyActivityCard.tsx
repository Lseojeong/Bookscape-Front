import { Activity } from '@/shared/ui/card/ActivityCard';
import BaseCardImage from '@/shared/ui/card/base/BaseCardImage';
import MyActivityCardInfo from '@/shared/ui/card/my-activity-card/MyActivityCardInfo';

export type MyActivityCardProps = {
  data: Pick<Activity, 'title' | 'reviewCount' | 'rating' | 'price'>;
};
export default function MyActivityCard({ data }: MyActivityCardProps) {
  return (
    <div className="relative flex w-full items-center overflow-hidden rounded-3xl shadow-card">
      <MyActivityCardInfo data={data} />
      <BaseCardImage
        containerClassName="absolute right-0 -z-10 w-[145px] h-42.5"
        imageClassName="w-full h-full"
      />
    </div>
  );
}
