'use client';

import { useActivityDetail } from '@/features/activity/activity-detail/queries/useActivityDetail';
import ActivityInfo from './ActivityInfo';
import ActivityTabSection from './ActivityTabSection';
import ImageCarousel from './ImageCarousel';

type ActivityDetailProps = {
  id: number;
};

/**
 * 체험 상세 페이지 컨테이너 컴포넌트입니다.
 *
 * 체험 상세 데이터를 패칭하고 하위 컴포넌트에 전달합니다.
 *
 * @example
 * ```tsx
 * <ActivityDetail id={ActivityId} />
 * ```
 */
export default function ActivityDetail({ id }: ActivityDetailProps) {
  const { data: activity } = useActivityDetail(id);

  if (!activity) return null;

  return (
    <section className="lg:w-167.5">
      {/* 이미지 캐러셀 */}
      <ImageCarousel images={activity.images} />
      {/* 카테고리, 제목, 별점, 위치 */}
      <ActivityInfo
        id={activity.id}
        category={activity.category}
        title={activity.title}
        rating={activity.rating}
        reviewCount={activity.reviewCount}
        address={activity.address}
      />
      {/* 탭바 */}
      <ActivityTabSection description="안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다." />
    </section>
  );
}
