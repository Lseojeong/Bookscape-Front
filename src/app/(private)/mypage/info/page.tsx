import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getMe } from '@/features/user/apis';
import MyInfoClient from '@/features/user/ui/MyInfoClient';
import MyInfoPageHeader from '@/features/user/ui/MyInfoPageHeader';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { getQueryClient } from '@/shared/utils/getQueryClient';
/**
 * 내 정보 페이지
 *
 * @description
 * 로그인한 사용자의 프로필 정보를 조회하고 수정할 수 있는 페이지입니다.
 * - 프로필 이미지 업로드 / 기본 이미지로 초기화
 * - 닉네임 수정
 * - 비밀번호 변경 (소셜 로그인 유저 제외)
 */
export default async function MyInfoPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.USER_ME(),
    queryFn: getMe,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <MyInfoPageHeader />
        <MyInfoClient />
      </div>
    </HydrationBoundary>
  );
}
