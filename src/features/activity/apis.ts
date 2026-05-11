import {
  ActivityDetailSchema,
  ActivityResponse,
  ActivityReviewsResponseSchema,
  ActivitySchedule,
  GetActivityReviewsParams,
  GetSearchActivityParams,
} from '@/features/activity/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { get } from '@/shared/apis/base/publicFetch';
import { CreateActivityReservationRequestBody } from '../reservation/types';

/** 체험 상세 조회 */
export const getActivityDetail = async (id: number) => {
  const data = await get(`/activities/${id}`);
  const activity = ActivityDetailSchema.parse(data);

  // NOTE: bannerImageUrl, subImages를 순서대로 합쳐서 반환
  const images = [activity.bannerImageUrl, ...activity.subImages.map((img) => img.imageUrl)];

  return { ...activity, images };
};

/** 체험 삭제 */
export const deleteActivity = async (id: number) => {
  await bffFetch.delete(`/my-activities/${id}`);
};

/** 예약 가능일 조회 */
export const getAvailableSchedule = async (activityId: number, year: string, month: string) => {
  return get<ActivitySchedule[]>(
    `/activities/${activityId}/available-schedule?year=${year}&month=${month}`
  );
};

/** 예약 신청 */
export const createReservation = async (
  activityId: number,
  body: CreateActivityReservationRequestBody
) => {
  return bffFetch.post(`/activities/${activityId}/reservations`, body);
};

export const getHotActivityData = async (size: number) => {
  const result = await get<ActivityResponse>('/activities', {
    method: 'offset',
    sort: 'most_reviewed',
    size,
  });
  return result?.activities ?? [];
};

export const getSearchActivityData = async ({
  method = 'offset',
  category,
  keyword,
  page = 1,
  size,
}: GetSearchActivityParams) => {
  return await get<ActivityResponse>('/activities', {
    method,
    ...(category && { category }),
    keyword,
    page,
    size,
  });
};

/** 체험 후기 조회 */
export const getActivityReviews = async ({
  activityId,
  page = 1,
  size = 3,
}: GetActivityReviewsParams) => {
  const data = await get(`/activities/${activityId}/reviews`, { page, size });
  return ActivityReviewsResponseSchema.parse(data);
};
