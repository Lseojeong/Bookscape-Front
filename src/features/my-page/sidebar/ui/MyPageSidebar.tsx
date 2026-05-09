'use client';

import Avatar from '@/shared/ui/avatar/Avatar';
import type { AvatarProps } from '@/shared/ui/avatar/types';
import TabNav from '@/shared/ui/tab-bar/TabNav';
import MyPageNav from './MyPageNav';

const MYPAGE_TABS = [
  { id: 'info', label: '내 정보', href: '/mypage/info' },
  { id: 'reservation-list', label: '예약내역', href: '/mypage/reservation-list' },
  { id: 'activity', label: '내 체험 관리', href: '/mypage/activity' },
  { id: 'reservation-status', label: '예약 현황', href: '/mypage/reservation-status' },
];

type MyPageSidebarProps = {
  user: AvatarProps['user'];
};

export default function MyPageSidebar({ user }: MyPageSidebarProps) {
  return (
    <>
      <aside className="sticky hidden h-fit w-44.5 shrink-0 rounded-xl border border-gray-50 bg-white px-3.5 py-4 shadow-drop md:top-30 md:block lg:w-72.5 lg:py-6">
        <div className="mb-3 flex justify-center lg:mb-6">
          <Avatar user={user} size="md" className="lg:h-30 lg:w-30">
            <Avatar.Img />
            <Avatar.Fallback />
          </Avatar>
        </div>
        <MyPageNav />
      </aside>
      <div className="sticky top-12 layer-header mb-6 bg-white pt-3 md:hidden">
        <TabNav tabs={MYPAGE_TABS} tabClassName="flex-1" />
      </div>
    </>
  );
}
