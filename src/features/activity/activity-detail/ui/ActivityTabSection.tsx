'use client';

import { useState } from 'react';
import TabBar from '@/shared/ui/tab-bar/TabBar';
import ActivityDescription from './ActivityDescription';

type ActivityTabSectionProps = {
  description: string;
};

const TAB_IDS = {
  DESCRIPTION: 'description',
  LOCATION: 'location',
  REVIEWS: 'reviews',
} as const;

const TABS = [
  { id: TAB_IDS.DESCRIPTION, label: '체험 설명' },
  { id: TAB_IDS.LOCATION, label: '오시는 길' },
  { id: TAB_IDS.REVIEWS, label: '체험 후기' },
];

/**
 * 체험 상세 탭 섹션 컴포넌트입니다.
 *
 * 체험 설명, 오시는 길, 체험 후기 탭으로 구성됩니다.
 *
 * @example
 * ```tsx
 * <ActivityTabSection description={activity.description} />
 * ```
 */
export default function ActivityTabSection({ description }: ActivityTabSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(TAB_IDS.DESCRIPTION);

  return (
    <>
      <div className="sticky top-12 layer-header bg-white md:top-20">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabClassName="flex-1 md:flex-none md:w-32.5"
        />
      </div>
      {activeTab === TAB_IDS.DESCRIPTION && <ActivityDescription description={description} />}
      {/* TODO: 오시는 길 */}
      {/* TODO: 체험 후기 */}
    </>
  );
}
