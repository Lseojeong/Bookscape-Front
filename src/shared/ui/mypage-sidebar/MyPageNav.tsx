'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, SVGProps } from 'react';
import {
  InfoIcon,
  ReservationListIcon,
  ActivityIcon,
  ReservationStatusIcon,
} from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type NavItem = {
  label: string;
  href: string;
  icon: FC<SVGProps<SVGSVGElement>>;
};

const NAV_ITEMS: NavItem[] = [
  { label: '내 정보', href: '/mypage/info', icon: InfoIcon },
  { label: '예약내역', href: '/mypage/reservation-list', icon: ReservationListIcon },
  { label: '내 체험 관리', href: '/mypage/activity', icon: ActivityIcon },
  { label: '예약 현황', href: '/mypage/reservation-status', icon: ReservationStatusIcon },
];

/**
 * 마이페이지 네비게이션 컴포넌트입니다.
 *
 * 현재 경로에 따라 활성화된 탭이 하이라이트되며,
 * 각 탭은 Link 태그로 라우터 이동을 처리합니다.
 *
 * @example
 * ```tsx
 * <MyPageNav />
 * ```
 */
export default function MyPageNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-3 lg:gap-3.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex items-center rounded-xl px-5 py-3.5 transition-colors lg:py-3.75',
                  isActive ? 'bg-primary-50 text-black' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon
                  className={cn(
                    'mr-2 h-5 w-5 lg:h-6 lg:w-6',
                    isActive ? 'text-primary-500' : 'text-gray-600'
                  )}
                />
                <span className="inline-flex h-5 items-center pt-0.5 typo-16-medium lg:h-6">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
