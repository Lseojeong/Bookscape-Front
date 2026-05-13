import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { activityDetailQueryOptions } from '@/features/my-page/activity-form/edit/queries/useActivityDetail';
import ActivityEditClient from '@/features/my-page/activity-form/edit/ui/ActivityEditClient';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export default async function ActivityEditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const activityId = Number(id);

  const queryClient = getQueryClient();

  try {
    const activity = await queryClient.fetchQuery(activityDetailQueryOptions(activityId));

    if (!activity) {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ActivityEditClient activityId={activityId} />
    </HydrationBoundary>
  );
}
