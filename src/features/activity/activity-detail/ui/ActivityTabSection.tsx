'use client';

import { useState } from 'react';
import TabBar from '@/shared/ui/tab-bar/TabBar';
import ActivityDescription from './ActivityDescription';
import ActivityLocation from './ActivityLocation';

type ActivityTabSectionProps = {
  description: string;
  address: string;
};

const TABS = [
  { id: 'description', label: '체험 설명' },
  { id: 'location', label: '오시는 길' },
  { id: 'reviews', label: '체험 후기' },
];

/**
 * 체험 상세 탭 섹션 컴포넌트입니다.
 *
 * 체험 설명, 오시는 길, 체험 후기 탭으로 구성됩니다.
 *
 * @remarks
 * 오시는 길 탭의 카카오맵은 스토리북에서 지원되지 않습니다.
 * 실제 동작은 로컬 서버에서 확인해주세요.
 *
 * @example
 * ```tsx
 * <ActivityTabSection description={activity.description} address={activity.address} />
 * ```
 */
export default function ActivityTabSection({ description, address }: ActivityTabSectionProps) {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div>
      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabClassName="flex-1 md:flex-none md:w-32.5"
      />
      {/* 체험 설명 */}
      {activeTab === 'description' && <ActivityDescription description={description} />}
      {/* 오시는 길 */}
      {activeTab === 'location' && <ActivityLocation address={address} />}
      {/* TODO: 체험 후기 */}
    </div>
  );
}
