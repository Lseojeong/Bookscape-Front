import BaseLayout from '@/shared/layout/BaseLayout';
import type { WithChildren } from '@/shared/types/common';

/**
 * PrivateLayout
 *
 * private(인증 필요) 영역 공통 레이아웃입니다.
 */
export default function PrivateLayout({ children }: WithChildren) {
  return <BaseLayout>{children}</BaseLayout>;
}
