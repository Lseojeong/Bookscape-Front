import MyPageSidebar from '@/features/my-page/common/ui/MyPageSidebar';
import type { WithChildren } from '@/shared/types/common';

type MyPageLayoutProps = WithChildren;

/**
 * 마이페이지 레이아웃 컴포넌트입니다.
 *
 */

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl md:flex md:justify-center md:gap-7.5 md:px-7.5 md:pt-10 lg:gap-12.5">
      <MyPageSidebar />
      <section className="min-w-0 flex-1 px-6 md:px-0">{children}</section>
    </div>
  );
}
