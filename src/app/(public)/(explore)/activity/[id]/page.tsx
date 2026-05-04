import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import ActivityDetail from '@/features/activity/activity-detail/ui/ActivityDetail';
import { getActivityDetail } from '@/features/activity/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { getQueryClient } from '@/shared/utils/getQueryClient';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ActivityDetailPage({ params }: Props) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.ACTIVITY_DETAIL(Number(id)),
    queryFn: () => getActivityDetail(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-280 px-6 pt-7.5 pb-30 md:px-7.5 md:pt-8.5 lg:flex lg:gap-10 lg:px-10 lg:pt-22 lg:pb-0">
        <ActivityDetail id={Number(id)} />
        <div className="hidden bg-red-100 lg:block lg:w-102.5">오른쪽 영역</div>
      </div>
      <div className="fixed right-0 bottom-0 left-0 bg-green-100 lg:hidden">하단 영역</div>
    </HydrationBoundary>
  );
}
