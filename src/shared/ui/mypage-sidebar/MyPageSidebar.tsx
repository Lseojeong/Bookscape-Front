'use client';

import Avatar from '@/shared/ui/avatar/Avatar';
import type { AvatarProps } from '@/shared/ui/avatar/types';
import MyPageNav from '@/shared/ui/mypage-sidebar/MyPageNav';
import TabNav from '@/shared/ui/tab-bar/TabNav';

/**
 * 마이페이지 사이드바 컴포넌트입니다.
 *
 * 아바타 이미지와 네비게이션 탭을 표시하며,
 * 375px 이하에서는 숨김 처리됩니다.
 * profileImageUrl이 있을 경우 이미지를, 없을 경우 Fallback UI를 표시합니다.
 *
 * @example
 * ```tsx
 * <MyPageSidebar user={user} />
 * ```
 */

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
      <aside className="sticky top-0 hidden h-fit w-44.5 shrink-0 rounded-xl border border-gray-50 bg-white px-3.5 py-4 shadow-drop sm:block lg:w-72.5 lg:py-6">
        <div className="mb-3 flex justify-center lg:mb-6">
          <Avatar user={user} size="md" className="lg:h-30 lg:w-30">
            <Avatar.Img />
            <Avatar.Fallback />
          </Avatar>
        </div>
        <MyPageNav />
      </aside>
      <div className="sticky top-0 mb-6 bg-white sm:hidden">
        <TabNav tabs={MYPAGE_TABS} tabClassName="flex-1" />
      </div>
    </>
  );
}
