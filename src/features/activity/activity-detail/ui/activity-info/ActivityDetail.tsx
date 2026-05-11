import type { ActivityDetail as ActivityDetailType } from '@/features/activity/types';
import ActivityTabSection from '../tab/ActivityTabSection';
import ActivityInfo from './ActivityInfo';
import ImageCarousel from './ImageCarousel';

type ActivityDetailProps = {
  activity: ActivityDetailType & { images: string[] };
};

/**
 * 체험 상세 페이지 컨테이너 컴포넌트입니다.
 *
 * 체험 상세 데이터를 props로 받아 하위 컴포넌트에 전달합니다.
 *
 * @example
 * ```tsx
 * <ActivityDetail activity={activity} />
 * ```
 */
export default function ActivityDetail({ activity }: ActivityDetailProps) {
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
        className="mt-7"
      />
      {/* 탭바 */}
      <ActivityTabSection
        description={activity.description}
        address={activity.address}
        className="mt-7"
      />
    </section>
  );
}
