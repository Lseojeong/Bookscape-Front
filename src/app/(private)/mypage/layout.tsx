import type { ReactNode } from 'react';
import { MOCK_USER } from '@/mocks/user';
import MyPageSidebar from '@/shared/ui/mypage-sidebar/MyPageSidebar';

type MyPageLayoutProps = {
  children: ReactNode;
};

/**
 * 마이페이지 레이아웃 컴포넌트입니다.
 *
 */

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl pt-3 sm:flex sm:justify-center sm:gap-7.5 sm:px-7.5 sm:pt-10 lg:gap-12.5">
      <MyPageSidebar user={MOCK_USER} />
      <section className="min-w-0 flex-1 px-6 md:px-0">{children}</section>
    </div>
  );
}
