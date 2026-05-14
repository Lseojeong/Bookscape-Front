import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchActivityDetail } from '@/features/my-page/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

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
