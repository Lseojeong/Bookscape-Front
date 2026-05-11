import { queryOptions, useQuery } from '@tanstack/react-query';
import type { ActivityDetailResponse } from '@/features/activity/types';
import { get } from '@/shared/apis/base/publicFetch';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

/** 상세 조회 API 호출 함수 */
const fetchActivityDetail = async (id: number) => {
  const res = await get<ActivityDetailResponse>(`/activities/${id}`);
  if (!res) throw new Error('체험 상세 정보를 불러오지 못했습니다.');
  return res;
};

/** 서버 컴포넌트와 클라이언트에서 공통으로 사용할 QueryOptions */
export const activityDetailQueryOptions = (id: number) =>
  queryOptions({
    queryKey: QUERY_KEYS.ACTIVITY_DETAIL(id),
    queryFn: () => fetchActivityDetail(id),
  });

/** 클라이언트 컴포넌트용 Custom Hook */
export const useActivityDetail = (id: number) => {
  return useQuery(activityDetailQueryOptions(id));
};
