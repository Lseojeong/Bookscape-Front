import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { activityDetailQueryOptions } from '@/features/my-page/activity-form/queries/useActivityDetail';
import ActivityEditClient from '@/features/my-page/activity-form/ui/ActivityEditClient';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export default async function ActivityEditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const activityId = Number(id);

  const queryClient = getQueryClient();

  // 서버 환경에서 초기 데이터 프리페칭
  await queryClient.prefetchQuery(activityDetailQueryOptions(activityId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ActivityEditClient activityId={activityId} />
    </HydrationBoundary>
  );
}
