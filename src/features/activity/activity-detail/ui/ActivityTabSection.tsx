'use client';

import { useState } from 'react';
import TabBar from '@/shared/ui/tab-bar/TabBar';

const TABS = [
  { id: 'description', label: '체험 설명' },
  { id: 'location', label: '오시는 길' },
  { id: 'reviews', label: '체험 후기' },
];

export default function ActivityTabSection() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div>
      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabClassName="flex-1 md:flex-none md:w-32.5"
      />
      {/* TODO: 체험 설명 */}
      {/* TODO: 오시는 길 */}
      {/* TODO: 체험 후기 */}
    </div>
  );
}
