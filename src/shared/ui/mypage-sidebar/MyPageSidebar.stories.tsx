import type { Meta, StoryObj } from '@storybook/nextjs';
import MyPageSidebar from '@/shared/ui/mypage-sidebar/MyPageSidebar';

const meta: Meta<typeof MyPageSidebar> = {
  title: 'Shared/MyPageSidebar',
  component: MyPageSidebar,
  args: {
    user: {
      nickname: '홍길동',
      profileImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGVm5P0-8Mjkm597XaYeSL2BlMIwp-APf0Q&s',
    },
  },
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
