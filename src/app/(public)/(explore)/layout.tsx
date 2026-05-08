import BaseLayout from '@/app/ui/layout/BaseLayout';
import type { WithChildren } from '@/shared/types/common';

/**
 * ExploreLayout
 *
 * 공개(explore) 영역 공통 레이아웃입니다.
 */
export default function ExploreLayout({ children }: WithChildren) {
  return <BaseLayout>{children}</BaseLayout>;
}
