import type { ReactNode } from 'react';
import MyPageSidebar from '@/shared/ui/mypage-sidebar/MyPageSidebar';

type MyPageLayoutProps = {
  children: ReactNode;
};

// TODO: API 연결 후 실제 유저 데이터로 교체
const MOCK_USER = {
  nickname: '정만철',
};

export default async function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl gap-4 pt-3 sm:flex sm:justify-center sm:pt-10">
      <MyPageSidebar user={MOCK_USER} />
      <main className="shrink-0">{children}</main>
    </div>
  );
}
