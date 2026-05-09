import type { ReactNode } from 'react';
import MyPageSidebar from '@/features/my-page/sidebar/ui/MyPageSidebar';
import { MOCK_USER } from '@/mocks/user';

type MyPageLayoutProps = {
  children: ReactNode;
};

/**
 * 마이페이지 레이아웃 컴포넌트입니다.
 *
 */

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl md:flex md:justify-center md:gap-7.5 md:px-7.5 md:pt-10 lg:gap-12.5">
      <MyPageSidebar user={MOCK_USER} />
      <section className="min-w-0 flex-1 px-6 md:px-0">{children}</section>
    </div>
  );
}
