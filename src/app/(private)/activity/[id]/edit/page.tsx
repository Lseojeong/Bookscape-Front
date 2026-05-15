import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { activityDetailQueryOptions } from '@/features/my-page/activity-form/edit/queries/useActivityDetail';
import ActivityEditClient from '@/features/my-page/activity-form/edit/ui/ActivityEditClient';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export const metadata: Metadata = {
  title: '내 체험 수정',
};

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
    <>
      <div className="mb-10">
        <PageHeader title="내 체험 수정" />
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ActivityEditClient activityId={activityId} />
      </HydrationBoundary>
    </>
  );
}
