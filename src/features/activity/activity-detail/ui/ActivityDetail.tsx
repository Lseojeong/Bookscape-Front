'use client';

import { useActivityDetail } from '@/features/activity/activity-detail/queries/useActivityDetail';
import ImageCarousel from './ImageCarousel';

type ActivityDetailProps = {
  id: number;
};

export default function ActivityDetail({ id }: ActivityDetailProps) {
  const { data: activity } = useActivityDetail(id);

  if (!activity) return null;

  return (
    <div className="lg:w-167.5">
      <ImageCarousel images={activity.images} />
      {/* 카테고리, 제목, 별점, 위치 */}
      {/* 탭바 */}
      {/* 체험 설명 */}
    </div>
  );
}
