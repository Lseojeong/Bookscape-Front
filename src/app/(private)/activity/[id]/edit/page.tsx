import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { activityDetailQueryOptions } from '@/features/my-page/activity-form/edit/queries/useActivityDetail';
import ActivityEditClient from '@/features/my-page/activity-form/edit/ui/ActivityEditClient';
import PageHeader from '@/shared/ui/page-header/PageHeader';
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
    // 서버 단에서 레이아웃과 헤더를 먼저 그림
    <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14">
      <div className="mb-10">
        <PageHeader title="내 체험 수정" />
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ActivityEditClient activityId={activityId} />
      </HydrationBoundary>
    </div>
  );
}
