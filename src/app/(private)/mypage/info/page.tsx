import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { userMeQueryOptions } from '@/features/user/queries/userMeQueryOptions';
import MyInfoClient from '@/features/user/ui/MyInfoClient';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export const metadata: Metadata = {
  title: '내 정보',
};

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

  await queryClient.prefetchQuery(userMeQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <PageHeader title="내 정보" description="닉네임과 비밀번호를 수정하실 수 있습니다." />
        <MyInfoClient />
      </div>
    </HydrationBoundary>
  );
}
