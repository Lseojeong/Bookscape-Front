import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import TabBar from './TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Shared/TabBar',
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
    tabs: [{ label: '체험 설명' }, { label: '오시는 길' }, { label: '체험 후기' }],
    tabClassName: 'flex-1 md:flex-none md:w-[130px]',
  },
};

// 마이페이지 (모바일)
export const MyPage: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('내 정보');
    return <TabBar {...args} activeTab={activeTab} onTabChange={setActiveTab} />;
  },
  args: {
    tabs: [
      { label: '내 정보' },
      { label: '예약내역' },
      { label: '내 체험 관리' },
      { label: '예약 현황' },
    ],
    tabClassName: 'flex-1',
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
      { label: '신청', count: 3 },
      { label: '승인', count: 1 },
      { label: '거절', count: 1 },
    ],
    tabClassName: 'flex-1',
  },
};
