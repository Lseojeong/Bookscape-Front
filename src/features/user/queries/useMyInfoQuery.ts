import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/user/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

/**
 * 내 정보 조회 훅
 *
 * @description
 * 로그인한 사용자의 정보를 조회합니다.
 */
export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_ME(),
    queryFn: getMe,
  });
};
