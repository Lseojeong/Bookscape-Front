import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/user/apis';
import { ApiError } from '@/shared/apis/apiError';
import { QUERY_KEYS } from '@/shared/constants/queryKey';

export const useMeQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_ME(),
    queryFn: getMe,
    staleTime: 5 * 60_000,
    retry: (failureCount, error) => {
      if (failureCount >= 1) return false;
      if (error instanceof ApiError) return error.status >= 500;
      return false;
    },
  });
};
