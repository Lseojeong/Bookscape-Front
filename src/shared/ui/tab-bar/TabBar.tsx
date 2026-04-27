'use client';

import { tabVariants } from '@/shared/ui/tab-bar/styles/tabVariants';
import { handleTabKeyDown } from '@/shared/ui/tab-bar/utils/tabKeyboardNavigation';
import { cn } from '@/shared/utils/cn';

type Tab = {
  id: string;
  label: string;
  count?: number;
};

type TabBarProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabLabel: string) => void;
  tabClassName?: string;
};

/**
 * 탭 선택 시 스크롤 이동, 콘텐츠 전환, 페이지 이동 등 다양한 방식으로 동작하는 탭바 공통 컴포넌트입니다.
 *
 * 체험 상세, 예약 현황 페이지에서 사용됩니다.
 * URL 이동이 필요한 경우 TabNav 컴포넌트를 사용해주세요.
 * count로 상태별 체험 개수를 함께 표시할 수 있습니다.
 * tabClassName으로 각 탭 버튼의 너비를 외부에서 지정할 수 있습니다.
 *
 * @param tabs - 탭 목록 (id: 고유 식별자, label: 탭 이름, count: 상태별 체험 개수)
 * @param activeTab - 현재 활성화된 탭 이름
 * @param onTabChange - 탭 변경 시 호출되는 콜백 함수
 * @param tabClassName - 각 탭에 추가로 적용할 클래스 이름
 *
 * @example
 * ```tsx
 * // 체험 상세 페이지 (스크롤 이동)
 * <TabBar
 *   tabs={[{ id: 'description', label: '체험 설명' }, ...]}
 *   activeTab={activeTab}
 *   onTabChange={handleTabChange}
 *   tabClassName="flex-1 md:flex-none md:w-[130px]"
 * />
 *
 * // 예약 현황 (콘텐츠 전환, count 포함)
 * <TabBar
 *   tabs={[{ id: 'pending', label: '신청', count: 3 }, ...]}
 *   activeTab={activeTab}
 *   onTabChange={handleTabChange}
 *   tabClassName="flex-1"
 * />
 * ```
 */
export default function TabBar({ tabs, activeTab, onTabChange, tabClassName }: TabBarProps) {
  return (
    <div className="flex w-full border-b border-gray-100" role="tablist" aria-label="탭 목록">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => activeTab !== tab.id && onTabChange(tab.id)}
          onKeyDown={(e) =>
            handleTabKeyDown(e, tabs.length, index, (nextIndex) => {
              onTabChange(tabs[nextIndex].id);
            })
          }
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          className={cn(
            tabVariants({ state: activeTab === tab.id ? 'active' : 'inactive' }),
            tabClassName
          )}
        >
          {tab.label}
          {tab.count !== undefined && <span aria-label={`${tab.count}건`}>&nbsp;{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}
