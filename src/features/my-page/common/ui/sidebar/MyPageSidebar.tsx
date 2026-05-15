'use client';

import { useUserStore } from '@/shared/stores/userStore';
import Avatar from '@/shared/ui/avatar/Avatar';
import TabNav from '@/shared/ui/tab-bar/TabNav';
import MyPageNav from './MyPageNav';

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

export default function MyPageSidebar() {
  const user = useUserStore((state) => state.user);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  const avatarUser =
    hasHydrated && user
      ? { nickname: user.nickname, profileImageUrl: user.profileImageUrl }
      : { nickname: '', profileImageUrl: null };
  return (
    <>
      <aside className="sticky hidden h-fit w-44.5 shrink-0 rounded-xl border border-gray-50 bg-white px-3.5 py-4 shadow-drop md:top-30 md:block lg:w-72.5 lg:py-6">
        <div className="mb-3 flex justify-center lg:mb-6">
          {!hasHydrated ? (
            <Avatar.Skeleton size="md" className="lg:h-30 lg:w-30" />
          ) : (
            <Avatar user={avatarUser} size="md" className="lg:h-30 lg:w-30">
              <Avatar.Img />
              <Avatar.Fallback />
            </Avatar>
          )}
        </div>
        <MyPageNav />
      </aside>
      <div className="sticky top-12 layer-base mb-6 bg-white pt-3 md:hidden">
        <TabNav tabs={MYPAGE_TABS} tabClassName="flex-1" />
      </div>
    </>
  );
}
