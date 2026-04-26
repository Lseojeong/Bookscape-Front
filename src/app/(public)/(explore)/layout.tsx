import BaseLayout from '@/shared/layout/BaseLayout';
import type { WithChildren } from '@/shared/types/common';

/**
 * ExploreLayout
 *
 * 공개(explore) 영역 공통 레이아웃입니다.
 *
 * @remarks
 * - 헤더는 비로그인 상태로 렌더링합니다.
 */
export default function ExploreLayout({ children }: WithChildren) {
  return <BaseLayout isLoggedIn={false}>{children}</BaseLayout>;
}
