import { MOCK_USER } from '@/mocks/user';
import BaseLayout from '@/shared/layout/BaseLayout';
import type { WithChildren } from '@/shared/types/common';

/**
 * PrivateLayout
 *
 * private(인증 필요) 영역 공통 레이아웃입니다.
 *
 * @remarks
 * - 헤더는 로그인 상태로 렌더링합니다. (임시 더미 유저)
 * - 실제 로그인 연동 전까지는 user 정보를 고정값으로 제공합니다.
 */
export default function PrivateLayout({ children }: WithChildren) {
  return (
    <BaseLayout isLoggedIn user={MOCK_USER}>
      {children}
    </BaseLayout>
  );
}
