import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import TabBar from '@/shared/ui/tab-bar/TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Shared/TabBar/TabBar',
  component: TabBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 체험 상세 페이지
export const ActivityDetail: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('체험 설명');
    return <TabBar {...args} activeTab={activeTab} onTabChange={setActiveTab} />;
  },
  args: {
    tabs: [
      { id: 'description', label: '체험 설명' },
      { id: 'location', label: '오시는 길' },
      { id: 'review', label: '체험 후기' },
    ],
    tabClassName: 'flex-1 md:flex-none md:w-[130px]',
  },
};

// 예약 현황 (count 포함)
export const ReservationStatus: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('신청');
    return <TabBar {...args} activeTab={activeTab} onTabChange={setActiveTab} />;
  },
  args: {
    tabs: [
      { id: 'pending', label: '신청', count: 3 },
      { id: 'approved', label: '승인', count: 1 },
      { id: 'rejected', label: '거절', count: 1 },
    ],
    tabClassName: 'flex-1',
  },
};
