import { ActivityDetailSchema, ActivityResponse } from '@/features/activity/types';
import { get } from '@/shared/apis/base/publicFetch';

export const getActivityDetail = async (id: number) => {
  const data = await get(`/activities/${id}`);
  const activity = ActivityDetailSchema.parse(data);

  // NOTE: bannerImageUrl, subImages를 순서대로 합쳐서 반환
  const images = [activity.bannerImageUrl, ...activity.subImages.map((img) => img.imageUrl)];

  return { ...activity, images };
};

export const getHotActivityData = async (size: number) => {
  const result = await get<ActivityResponse>(
    `/activities?method=offset&sort=most_reviewed&size=${size}`
  );
  return result?.activities ?? [];
};
