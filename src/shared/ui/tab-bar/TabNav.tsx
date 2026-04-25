'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tabVariants } from '@/shared/ui/tab-bar/styles/tabVariants';
import { cn } from '@/shared/utils/cn';

type Tab = {
  id: string;
  label: string;
  href: string;
};

type TabNavProps = {
  tabs: Tab[];
  tabClassName?: string;
};

/**
 * URL 기반으로 동작하는 탭 네비게이션 공통 컴포넌트입니다.
 *
 * 마이페이지의 모바일 버전에서 사용되며, usePathname으로 현재 경로를 감지해 활성 탭을 표시합니다.
 * URL 이동이 필요없는 경우 TabBar 컴포넌트를 사용해주세요.
 * tabClassName으로 각 탭 버튼의 너비를 외부에서 지정할 수 있습니다.
 *
 * @param tabs - 탭 목록 (id: 고유 식별자, label: 탭 이름, href: 이동할 URL)
 * @param tabClassName - 각 탭에 추가로 적용할 클래스 이름
 *
 * @example
 * ```tsx
 * <TabNav
 *  tabs={[
 *    { id: 'info', label: '내 정보', href: '/mypage/info' },
 *    { id: 'reservation-list', label: '예약내역', href: '/mypage/reservations' },
 *    { id: 'activity', label: '내 체험 관리', href: '/mypage/activities' },
 *    { id: 'reservation-status', label: '예약 현황', href: '/mypage/reservation-status' },
 *  ]}
 *  tabClassName="flex-1"
 * />
 * ```
 */
export default function TabNav({ tabs, tabClassName }: TabNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex w-full border-b border-gray-100" role="tablist" aria-label="탭 목록">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            className={cn(tabVariants({ state: isActive ? 'active' : 'inactive' }), tabClassName)}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
