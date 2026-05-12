import type { Meta, StoryObj } from '@storybook/nextjs';
import MyPageSidebar from '@/features/my-page/ui/MyPageSidebar';

const meta: Meta<typeof MyPageSidebar> = {
  title: 'Features/MyPage/MyPageSidebar',
  component: MyPageSidebar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoActive: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/mypage/info' } },
  },
};

export const ReservationListActive: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/mypage/reservation-list' } },
  },
};

export const ActivityActive: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/mypage/activity' } },
  },
};

export const ReservationStatusActive: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/mypage/reservation-status' } },
  },
};
