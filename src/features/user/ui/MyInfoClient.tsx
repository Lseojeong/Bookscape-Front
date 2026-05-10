'use client';

import { useQueryClient } from '@tanstack/react-query';
import { updateMyProfile } from '@/features/user/apis';
import { useMyInfoQuery } from '@/features/user/queries/useMyInfoQuery';
import type { UpdateMyProfileRequestBody } from '@/features/user/types';
import ProfileForm from '@/features/user/ui/ProfileForm';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import Loading from '@/shared/ui/loading/Loading';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * 내 정보 페이지 클라이언트 컴포넌트
 *
 * @description
 * 서버 컴포넌트인 MyInfoPage에서 이벤트 핸들러를 분리합니다.
 */
export default function MyInfoClient() {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useMyInfoQuery();

  const handleUpdateUser = async (body: UpdateMyProfileRequestBody) => {
    try {
      await updateMyProfile(body);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_ME() });
      showToast('check', '프로필이 저장되었습니다.');
    } catch {
      showToast('cancel', '프로필 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (!user) return null;

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-6 md:w-119 lg:w-160">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loading size={20} color="var(--color-gray-400)" />
        </div>
      ) : user ? (
        <ProfileForm user={user} onUpdateUser={handleUpdateUser} />
      ) : null}
    </div>
  );
}
