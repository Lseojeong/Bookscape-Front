'use client';

import { useUpdateMyProfileMutation } from '@/features/user/mutations/useUpdateMyProfileMutation';
import { useMyInfoQuery } from '@/features/user/queries/useMyInfoQuery';
import ProfileForm from '@/features/user/ui/ProfileForm';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import Loading from '@/shared/ui/loading/Loading';

/**
 * 내 정보 페이지 클라이언트 컴포넌트
 *
 * @description
 * 서버 컴포넌트인 MyInfoPage에서 이벤트 핸들러를 분리합니다.
 */
export default function MyInfoClient() {
  const { data: user, isLoading, isError, refetch } = useMyInfoQuery();
  const { mutateAsync: updateUser } = useUpdateMyProfileMutation();

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-6 md:w-119 lg:w-160">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loading size={20} color="var(--color-gray-400)" />
        </div>
      ) : isError ? (
        <EmptyState
          type="error"
          mainText={'정보를 불러오는 데 실패했어요.\n다시 시도해주세요.'}
          onRetry={refetch}
        />
      ) : user ? (
        <ProfileForm user={user} onUpdateUser={updateUser} />
      ) : null}
    </div>
  );
}
