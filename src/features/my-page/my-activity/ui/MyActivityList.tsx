'use client';

import MyActivityCard from '@/features/my-page/my-activity/ui/my-activity-card/MyActivityCard';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import { useMyActivities } from '../queries/useMyActivities';

export default function MyActivityList() {
  const { data, isLoading, isError } = useMyActivities({ size: 10 });

  if (isLoading) {
    // TODO: 스켈레톤 UI로 교체
    return null;
  }

  if (isError) {
    return (
      <EmptyState
        type="error"
        mainText={'내 체험 목록을 불러오지 못했어요.\n잠시 후 다시 시도해주세요.'}
      />
    );
  }

  const activities = data?.activities ?? [];

  if (activities.length === 0) {
    return (
      <EmptyState
        type="experience"
        mainText={'아직 등록한 체험이 없어요.\n새로운 체험을 등록해보세요!'}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-7.5">
      {activities.map((activity) => (
        <MyActivityCard
          key={activity.id}
          data={{
            id: activity.id,
            title: activity.title,
            rating: activity.rating,
            reviewCount: activity.reviewCount,
            price: activity.price,
            bannerImageUrl: activity.bannerImageUrl,
          }}
        />
      ))}
    </div>
  );
}
