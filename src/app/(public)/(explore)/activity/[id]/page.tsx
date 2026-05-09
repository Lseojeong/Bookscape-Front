import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { prefetchActivityDetail } from '@/features/activity/activity-detail/queries/prefetchActivityDetail';
import ActivityDetail from '@/features/activity/activity-detail/ui/ActivityDetail';
import ReservationBar from '@/features/activity/activity-detail/ui/ReservationBar';
import ReservationWidget from '@/features/activity/activity-detail/ui/ReservationWidget';
import { getQueryClient } from '@/shared/utils/getQueryClient';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ActivityDetailPage({ params }: Props) {
  const { id } = await params;
  const activityId = Number(id);
  const queryClient = getQueryClient();

  if (isNaN(activityId) || activityId <= 0) {
    notFound();
  }

  await prefetchActivityDetail(queryClient, activityId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-280 px-6 pt-7.5 pb-30 md:px-7.5 md:pt-8.5 lg:flex lg:gap-10 lg:px-10 lg:pt-22 lg:pb-0">
        <ActivityDetail id={activityId} />
        <aside className="hidden lg:block lg:w-102.5">
          <ReservationWidget />
        </aside>
      </div>
      <div className="fixed right-0 bottom-0 left-0 layer-header lg:hidden">
        <ReservationBar />
      </div>
    </HydrationBoundary>
  );
}
