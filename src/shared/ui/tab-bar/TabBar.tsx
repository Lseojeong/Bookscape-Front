'use client';

import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

type Tab = {
  label: string;
  count?: number;
};

type TabBarProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabLabel: string) => void;
  tabClassName?: string;
};

const tabVariants = cva(
  'h-10 cursor-pointer flex items-center justify-center -mb-px', // 모든 탭에 공통으로 적용될 스타일
  {
    variants: {
      state: {
        active: 'typo-16-bold text-primary-500 border-b-2 border-primary-500', // 활성화 탭
        inactive: 'typo-16-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent', // 비활성화 탭
      },
    },
  }
);

/**
 * 탭 선택 시 스크롤 이동, 콘텐츠 전환, 페이지 이동 등 다양한 방식으로 동작하는 탭바 공통 컴포넌트입니다.
 *
 * 체험 상세, 마이페이지, 예약 현황 페이지에서 사용됩니다.
 * count prop으로 상태별 체험 개수를 함께 표시할 수 있습니다.
 * tabClassName으로 각 탭 버튼의 너비를 외부에서 지정할 수 있습니다.
 *
 * @param tabs - 탭 목록 (label: 탭 이름, count: 상태별 체험 개수)
 * @param activeTab - 현재 활성화된 탭 이름
 * @param onTabChange - 탭 변경 시 호출되는 콜백 함수
 * @param tabClassName - 각 탭에 추가로 적용할 클래스 이름
 *
 * @example
 * ```tsx
 * // 체험 상세 페이지 (스크롤 이동)
 * <TabBar
 *   tabs={[{ label: '체험 설명' }, { label: '오시는 길' }, { label: '체험 후기' }]}
 *   activeTab={activeTab}
 *   onTabChange={handleTabChange}
 *   tabClassName="flex-1 md:flex-none md:w-[130px]"
 * />
 *
 * // 마이페이지 (URL 이동)
 * <TabBar
 *   tabs={[{ label: '내 정보' }, { label: '예약내역' }, { label: '내 체험 관리' }, { label: '예약 현황' }]}
 *   activeTab={activeTab}
 *   onTabChange={(tab) => {
 *     const pathMap: Record<string, string> = {
 *       '내 정보': '/mypage/info',
 *       '예약내역': '/mypage/reservation-list',
 *       '내 체험 관리': '/mypage/activity',
 *       '예약 현황': '/mypage/reservation-status',
 *     };
 *    router.push(pathMap[tab]);
 *   }}
 *   tabClassName="flex-1"
 * />
 *
 * // 예약 현황 (콘텐츠 전환, count 포함)
 * <TabBar
 *   tabs={[{ label: '신청', count: 3 }, { label: '승인', count: 1 }, { label: '거절', count: 1 }]}
 *   activeTab={activeTab}
 *   onTabChange={handleTabChange}
 *   tabClassName="flex-1"
 * />
 * ```
 */
export default function TabBar({ tabs, activeTab, onTabChange, tabClassName }: TabBarProps) {
  return (
    <div className="flex w-full border-b border-gray-100" role="tablist" aria-label="탭 목록">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => activeTab !== tab.label && onTabChange(tab.label)}
          role="tab"
          aria-selected={activeTab === tab.label}
          className={cn(
            tabVariants({ state: activeTab === tab.label ? 'active' : 'inactive' }),
            tabClassName
          )}
        >
          {tab.label}
          {tab.count !== undefined && <span> {tab.count}</span>}
        </button>
      ))}
    </div>
  );
}
