import type { ActivityDetailResponse } from '@/features/activity/types';
import type {
  UpdateMyActivityRequestBody,
  UpdateMyActivityResponse,
} from '@/features/my-page/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { get } from '@/shared/apis/base/publicFetch';

/** 체험 상세 조회 API */
export const fetchActivityDetail = async (id: number) => {
  const res = await get<ActivityDetailResponse>(`/activities/${id}`);
  if (!res) throw new Error('체험 상세 정보를 불러오지 못했습니다.');
  return res;
};

/** 내 체험 수정 API */
export const updateMyActivity = async (id: number, data: UpdateMyActivityRequestBody) => {
  const res = await bffFetch.patch<UpdateMyActivityResponse>(`/my-activities/${id}`, data);
  if (!res) throw new Error('체험 수정에 실패했습니다.');
  return res;
};
