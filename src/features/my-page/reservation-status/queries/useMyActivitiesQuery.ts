import { useQuery } from '@tanstack/react-query';
import { getMyActivities } from '@/features/my-page/apis';

/**
 * 내 체험 리스트 조회 훅
 *
 * @description
 * 드롭다운에 표시할 체험 목록을 조회합니다.
 * 전체 목록이 필요하므로 `size`를 크게 잡아요.
 */
export const useMyActivitiesQuery = () => {
  return useQuery({
    //TODO : 내 체험 관리 페이지 머지되면 shared/constants/queryKeys로 수정
    queryKey: ['my-activities'],
    queryFn: () => getMyActivities({ size: 100 }),
    select: (data) => data.activities,
  });
};
