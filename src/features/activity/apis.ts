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

/**
 * 메인 페이지의 인기 체험 목록을 조회합니다.
 * 'most_reviewed' 순으로 정렬된 데이터를 가져오며, Zod를 통해 런타임 데이터 검증을 수행합니다.
 *
 * @param size - 조회할 데이터 개수
 * @returns 검증된 인기 체험 목록 배열
 * @example
 * ```ts
 * const activities = await getHotActivityData(8);
 * ```
 */
export const getHotActivityData = async (size: number) => {
  const result = await get<ActivityResponse>('/activities', {
    method: 'offset',
    sort: 'most_reviewed',
    size,
  });
  const parsed = ActivityResponseSchema.parse(result ?? { activities: [], totalCount: 0 });

  return parsed.activities;
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
  const data = await get<ActivityResponse>('/activities', {
    method,
    ...(category && { category }),
    ...(keyword && { keyword }),
    ...(sort && { sort }),
    page,
    size,
  });
  return ActivityResponseSchema.parse(data ?? { activities: [], totalCount: 0 });
};
