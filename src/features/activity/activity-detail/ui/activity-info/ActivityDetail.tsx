import ActivityInfo from '@/features/activity/activity-detail/ui/activity-info/ActivityInfo';
import ImageCarousel from '@/features/activity/activity-detail/ui/activity-info/ImageCarousel';
import ActivityTabSection from '@/features/activity/activity-detail/ui/tab/ActivityTabSection';
import type {
  ActivityDetail as ActivityDetailType,
  ActivityReviewsResponse,
} from '@/features/activity/types';

type ActivityDetailProps = {
  activity: ActivityDetailType & { images: string[] };
  initialReviewsData?: ActivityReviewsResponse;
};

/**
 * 체험 상세 페이지 컨테이너 컴포넌트입니다.
 *
 * 체험 상세 데이터를 props로 받아 하위 컴포넌트에 전달합니다.
 *
 * @example
 * ```tsx
 * <ActivityDetail activity={activity} initialReviewsData={initialReviewsData} />
 * ```
 */
export default function ActivityDetail({ activity, initialReviewsData }: ActivityDetailProps) {
  return (
    <section className="lg:w-167.5">
      {/* 이미지 캐러셀 */}
      <ImageCarousel images={activity.images} />
      {/* 카테고리, 제목, 별점, 위치 */}
      <ActivityInfo
        id={activity.id}
        userId={activity.userId}
        category={activity.category}
        title={activity.title}
        rating={activity.rating}
        reviewCount={activity.reviewCount}
        address={activity.address}
        description={activity.description}
        bannerImageUrl={activity.bannerImageUrl}
        className="mt-7"
      />
      {/* 탭바 */}
      <ActivityTabSection
        activityId={activity.id}
        description={activity.description}
        address={activity.address}
        initialReviewsData={initialReviewsData}
        className="mt-7"
      />
    </section>
  );
}
