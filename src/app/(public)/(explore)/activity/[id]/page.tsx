import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ActivityDetail from '@/features/activity/activity-detail/ui/activity-info/ActivityDetail';
import { getActivityDetail } from '@/features/activity/apis';
import ReservationBar from '@/features/reservation/activity-panel/ui/ReservationBar';
import ReservationWidget from '@/features/reservation/activity-panel/ui/ReservationWidget';
import { ApiError } from '@/shared/apis/apiError';
import { COMMON_OPEN_GRAPH } from '@/shared/constants/metadata';

type Props = {
  params: Promise<{ id: string }>;
};

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const activityId = Number(id);

  // 잘못된 ID일 시 반환
  if (isNaN(activityId) || activityId <= 0) {
    return { title: '페이지를 찾을 수 없습니다', description: '요청하신 체험을 찾을 수 없습니다.' };
  }

  try {
    const activity = await getActivityDetail(activityId);

    return {
      title: `${activity.title}`,
      description: activity.description || '북스케이프에서 특별한 체험을 예약하고 즐겨보세요.',
      openGraph: {
        ...COMMON_OPEN_GRAPH,
        url: `/activity/${activityId}`,
        images: [activity.bannerImageUrl],
      },
    };
  } catch {
    // API 통신 실패 시 반환
    return { title: '페이지를 찾을 수 없습니다', description: '요청하신 체험을 찾을 수 없습니다.' };
  }
}

export default async function ActivityDetailPage({ params }: Props) {
  const { id } = await params;
  const activityId = Number(id);

  if (isNaN(activityId) || activityId <= 0) {
    notFound();
  }

  const activity = await getActivityDetail(activityId).catch((error) => {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  });

  if (!activity) notFound();

  return (
    <>
      <div className="mx-auto max-w-280 px-6 pt-7.5 pb-30 md:px-7.5 md:pt-8.5 lg:flex lg:gap-10 lg:px-10 lg:pt-22">
        <ActivityDetail activity={activity} />
        <aside className="hidden lg:block lg:w-102.5">
          <ReservationWidget activityId={activityId} />
        </aside>
      </div>
      <ReservationBar activityId={activityId} />
    </>
  );
}
