'use client';

import { useMemo } from 'react';
import {
  MY_ACTIVITIES_PAGE_SIZE,
  useMyActivities,
} from '@/features/my-page/my-activity/queries/useMyActivities';
import MyActivityCard from '@/features/my-page/my-activity/ui/my-activity-card/MyActivityCard';
import MyActivityCardSkeleton from '@/features/my-page/my-activity/ui/skeleton/MyActivityCardSkeleton';
import useDelayedLoading from '@/shared/hooks/useDelayedLoading';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import InfiniteScrollSentinel from '@/shared/ui/infinite-scroll/InfiniteScrollSentinel';

export default function MyActivityList() {
  const query = useMyActivities({ size: MY_ACTIVITIES_PAGE_SIZE });
  const isSkeletonVisible = useDelayedLoading(query.isPending);

  const activities = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.activities) ?? [];
  }, [query.data?.pages]);

  const isInitialError = query.isError && activities.length === 0;

  const { setSentinel } = useInfiniteScroll({
    enabled: query.isSuccess && !query.isFetchNextPageError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  if (query.isPending && activities.length === 0) {
    if (!isSkeletonVisible) return null;

    return (
      <div className="flex flex-col gap-4 md:gap-7.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <MyActivityCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isInitialError) {
    return (
      <EmptyState
        type="error"
        mainText={'내 체험 목록을 불러오지 못했어요.\n잠시 후 다시 시도해주세요.'}
      />
    );
  }

  if (activities.length === 0) {
    return (
      <EmptyState
        type="experience"
        mainText={'아직 등록한 체험이 없어요.\n새로운 체험을 등록해보세요!'}
      />
    );
  }

  return (
    <>
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

      <InfiniteScrollSentinel
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        isFetchNextPageError={query.isFetchNextPageError}
        onRetryFetchNextPage={() => query.fetchNextPage()}
        setSentinel={setSentinel}
      />
    </>
  );
}
