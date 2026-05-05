'use client';

import { useActivityDetail } from '@/features/activity/activity-detail/queries/useActivityDetail';
import ActivityInfo from './ActivityInfo';
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
      <ImageCarousel images={activity.images} />
      {/* 카테고리, 제목, 별점, 위치 */}
      <ActivityInfo
        category="문화 · 예술"
        title="함께 배우면 즐거운 스트릿 댄스"
        rating={4.9}
        reviewCount={293}
        address="서울 중구 청계천로 100 10F"
      />
      {/* 탭바 */}
      {/* 체험 설명 */}
    </section>
  );
}
