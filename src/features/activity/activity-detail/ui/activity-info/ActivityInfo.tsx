import ActivityAddress from '@/features/activity/activity-detail/ui/activity-info/ActivityAddress';
import ActivityKebabMenu from '@/features/activity/activity-detail/ui/activity-info/ActivityKebabMenu';
import ActivityShare from '@/features/activity/activity-detail/ui/share/ActivityShare';
import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';
import Title from '@/shared/ui/title/Title';
import { cn } from '@/shared/utils/cn';

type ActivityInfoProps = {
  id: number;
  userId: number;
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
  description: string;
  bannerImageUrl: string;
  className?: string;
};

/**
 * 체험 기본 정보 컴포넌트입니다.
 *
 * 카테고리, 제목, 별점, 리뷰 수, 주소를 표시하며 수정/삭제 메뉴를 제공합니다.
 *
 * @example
 * ```tsx
 * <ActivityInfo
 *   id={activity.id}
 *   userId={activity.userId}
 *   category={activity.category}
 *   title={activity.title}
 *   rating={activity.rating}
 *   reviewCount={activity.reviewCount}
 *   address={activity.address}
 * />
 *
 */
export default function ActivityInfo({
  id,
  userId,
  category,
  title,
  rating,
  reviewCount,
  address,
  description,
  bannerImageUrl,
  className,
}: ActivityInfoProps) {
  return (
    <div className={cn(className)}>
      <div className="mb-1 flex items-center justify-between md:mb-2.5">
        {/* 카테고리 */}
        <p className="typo-13-medium text-gray-700 md:typo-14-medium md:text-gray-950">
          {category}
        </p>
        {/* 케밥 버튼 */}
        <ActivityKebabMenu id={id} userId={userId} />
      </div>
      {/* 타이틀 */}
      <Title as="h1" size="18" weight="bold" color="text-gray-950" className="mb-4 md:typo-24-bold">
        {title}
      </Title>
      {/* 별점 */}
      <div className="mb-2.5">
        <RatingSummary averageRating={rating} totalCount={reviewCount} />
      </div>
      {/* 주소, 공유 기능 */}
      <div className="flex items-center justify-between">
        <ActivityAddress address={address} />
        <ActivityShare title={title} description={description} bannerImageUrl={bannerImageUrl} />
      </div>
    </div>
  );
}
