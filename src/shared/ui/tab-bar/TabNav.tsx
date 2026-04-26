'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { tabVariants } from '@/shared/ui/tab-bar/styles/tabVariants';
import { handleTabKeyDown } from '@/shared/ui/tab-bar/utils/tabKeyboardNavigation';
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
 * // 마이페이지 레이아웃에서 모바일 전용으로 사용
 * <div className="md:hidden">
 *   <TabNav tabs={TAB_ITEMS} tabClassName="flex-1" />
 * </div>
 * ```
 */
export default function TabNav({ tabs, tabClassName }: TabNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex w-full border-b border-gray-100" role="tablist" aria-label="탭 목록">
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            className={cn(tabVariants({ state: isActive ? 'active' : 'inactive' }), tabClassName)}
            onKeyDown={(e) =>
              handleTabKeyDown(e, tabs.length, index, (nextIndex) => {
                router.push(tabs[nextIndex].href);
              })
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
