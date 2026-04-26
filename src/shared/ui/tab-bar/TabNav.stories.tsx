import type { Meta, StoryObj } from '@storybook/nextjs';
import TabNav from '@/shared/ui/tab-bar/TabNav';

const meta: Meta<typeof TabNav> = {
  title: 'Shared/TabBar/TabNav',
  component: TabNav,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/mypage/info',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 마이페이지 (모바일)
export const MyPage: Story = {
  args: {
    tabs: [
      { id: 'info', label: '내 정보', href: '/mypage/info' },
      { id: 'reservation-list', label: '예약내역', href: '/mypage/reservation-list' },
      { id: 'activity', label: '내 체험 관리', href: '/mypage/activity' },
      { id: 'reservation-status', label: '예약 현황', href: '/mypage/reservation-status' },
    ],
    tabClassName: 'flex-1',
  },
};
