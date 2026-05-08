import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/user/apis';
import { ApiError } from '@/shared/apis/apiError';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

const USER_ME_STALE_TIME_MS = 5 * 60_000;

export const useMeQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_ME(),
    queryFn: getMe,
    staleTime: USER_ME_STALE_TIME_MS,
    retry: (failureCount, error) => {
      if (failureCount >= 1) return false;
      if (error instanceof ApiError) return error.status >= 500;
      return false;
    },
  });
};
