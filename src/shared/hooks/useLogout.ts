import { useRouter } from 'next/navigation';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { useUserStore } from '@/shared/stores/userStore';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * 로그아웃을 처리하는 훅입니다.
 * BFF Route Handler를 호출해 HttpOnly 쿠키를 삭제하고,
 * 성공 시 Zustand 스토어를 초기화한 뒤 메인 페이지로 이동합니다.
 *
 * @example
 * ```ts
 * const { handleLogout } = useLogout();
 * ```
 */
export const useLogout = () => {
  const router = useRouter();
  const { showToast } = useToastStore();
  const clearSession = useUserStore((state) => state.clearSession);

  const handleLogout = async () => {
    try {
      const response = await bffFetch.post('/auth/logout');
      if (response === null) throw new Error();
      showToast('check', '로그아웃 되었습니다.');
    } catch {
      showToast('cancel', '로그아웃 중 오류가 발생했습니다.');
    } finally {
      clearSession('user');
      router.replace('/');
    }
  };

  return { handleLogout };
};
