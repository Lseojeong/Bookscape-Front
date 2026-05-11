import {
  ActivityDetailSchema,
  ActivityResponse,
  ActivityResponseSchema,
  GetActivityParams,
} from '@/features/activity/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { get } from '@/shared/apis/base/publicFetch';

export const getActivityDetail = async (id: number) => {
  const data = await get(`/activities/${id}`);
  const activity = ActivityDetailSchema.parse(data);

  // NOTE: bannerImageUrl, subImages를 순서대로 합쳐서 반환
  const images = [activity.bannerImageUrl, ...activity.subImages.map((img) => img.imageUrl)];

  return { ...activity, images };
};

export const deleteActivity = async (id: number) => {
  // TODO: 로그인 구현 후 BFF Route Handler 연결 필요
  await bffFetch.delete(`/activities/${id}`);
};

/** 메인 페이지 - 인기 체험 목록 */
export const getHotActivityData = async (size: number) => {
  const result = await get<ActivityResponse>('/activities', {
    method: 'offset',
    sort: 'most_reviewed',
    size,
  });
  return ActivityResponseSchema.parse(result ?? { activities: [], totalCount: 0 });
};

/** 검색 페이지, 전체 체험 목록 페이지 */
export const getActivityListData = async ({
  method = 'offset',
  category,
  keyword,
  sort,
  page = 1,
  size,
}: GetActivityParams) => {
  return await get<ActivityResponse>('/activities', {
    method,
    ...(category && { category }),
    ...(keyword && { keyword }),
    ...(sort && { sort }),
    page,
    size,
  });
};
