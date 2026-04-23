import type { Meta, StoryObj } from '@storybook/nextjs';
import Profile from '@/shared/ui/profile/Profile';

const meta: Meta<typeof Profile> = {
  title: 'Shared/Profile',
  component: Profile,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    nicknameClassName: {
      control: 'select',
      options: ['text-gray-500', 'text-gray-950', 'text-white'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      nickname: '정만철',
      profileImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGVm5P0-8Mjkm597XaYeSL2BlMIwp-APf0Q&s',
    },
    size: 'sm',
  },
};
