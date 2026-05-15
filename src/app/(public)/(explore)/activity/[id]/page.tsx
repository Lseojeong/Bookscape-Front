import { format } from 'date-fns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ActivityDetail from '@/features/activity/activity-detail/ui/activity-info/ActivityDetail';
import { getActivityDetail, getActivityReviews } from '@/features/activity/apis';
import ReservationBar from '@/features/reservation/activity-panel/ui/ReservationBar';
import ReservationWidget from '@/features/reservation/activity-panel/ui/ReservationWidget';
import { getAvailableSchedule } from '@/features/reservation/apis';
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

  // 서버 렌더 시점의 현재 연/월
  const now = new Date();
  const initialScheduleYear = format(now, 'yyyy');
  const initialScheduleMonth = format(now, 'MM');

  // 3개 병렬 요청: 체험 상세 정보는 필수, 리뷰/예약가능일은 실패해도 상세 정보 렌더
  const [detailResult, reviewsResult, scheduleResult] = await Promise.allSettled([
    getActivityDetail(activityId),
    getActivityReviews({ activityId, page: 1, size: 3 }),
    getAvailableSchedule(activityId, initialScheduleYear, initialScheduleMonth),
  ]);

  // 체험 상세 정보 불러오기 실패 시 404 또는 에러 처리
  if (detailResult.status === 'rejected') {
    const error = detailResult.reason;
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const activity = detailResult.value;
  // 실패한 경우 undefined → 클라이언트에서 React Query가 직접 fetch
  const initialReviewsData = reviewsResult.status === 'fulfilled' ? reviewsResult.value : undefined;
  const initialScheduleData =
    scheduleResult.status === 'fulfilled' ? scheduleResult.value : undefined;

  return (
    <>
      <div className="mx-auto max-w-280 px-6 pt-7.5 pb-30 md:px-7.5 md:pt-8.5 lg:flex lg:gap-10 lg:px-10 lg:pt-22">
        <ActivityDetail activity={activity} initialReviewsData={initialReviewsData} />
        <aside className="hidden lg:block lg:w-102.5">
          <ReservationWidget
            activityId={activityId}
            initialActivityData={activity}
            initialScheduleData={initialScheduleData}
            initialScheduleYear={initialScheduleYear}
            initialScheduleMonth={initialScheduleMonth}
          />
        </aside>
      </div>
      <ReservationBar
        activityId={activityId}
        initialActivityData={activity}
        initialScheduleData={initialScheduleData}
        initialScheduleYear={initialScheduleYear}
        initialScheduleMonth={initialScheduleMonth}
      />
    </>
  );
}
