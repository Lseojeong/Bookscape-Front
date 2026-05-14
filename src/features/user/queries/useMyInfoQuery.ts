import { useQuery } from '@tanstack/react-query';
import { userMeQueryOptions } from '@/features/user/queries/userMeQueryOptions';

/**
 * 내 정보 조회 훅
 *
 * @description
 * - `userMeQueryOptions`를 기반으로 로그인한 사용자의 정보를 조회합니다.

 */
export const useMyInfoQuery = () => useQuery(userMeQueryOptions());
