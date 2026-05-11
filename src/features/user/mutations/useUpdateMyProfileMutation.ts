import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMyProfile } from '@/features/user/apis';
import type { UpdateMyProfileRequestBody } from '@/features/user/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * 내 정보 수정 뮤테이션 훅
 *
 * @description
 * 프로필 수정 후 USER_ME 쿼리를 갱신하고 userStore도 업데이트합니다.
 * 성공/실패 시 토스트를 표시합니다.
 */
export const useUpdateMyProfileMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (body: UpdateMyProfileRequestBody) => updateMyProfile(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_ME() });
      const updated = await queryClient.fetchQuery({
        queryKey: QUERY_KEYS.USER_ME(),
        queryFn: getMe,
      });
      if (updated) {
        const { loginMethod: _, ...userResponse } = updated;
        setUser(userResponse);
      }
      showToast('check', '프로필이 저장되었습니다.');
    },
    onError: () => {
      showToast('cancel', '프로필 저장에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
