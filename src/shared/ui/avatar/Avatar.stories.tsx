import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar from '@/shared/ui/avatar/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// 이미지 있는 경우
export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <Avatar.Img loading="eager" />
      <Avatar.Fallback />
    </Avatar>
  ),
  args: {
    user: {
      nickname: '정만철',
      profileImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGVm5P0-8Mjkm597XaYeSL2BlMIwp-APf0Q&s',
    },
  },
};

// 이미지 없을 때 Fallback 표시
export const WithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <Avatar.Img />
      <Avatar.Fallback />
    </Avatar>
  ),
  args: {
    user: {
      nickname: '정만철',
      profileImageUrl: '',
    },
  },
};
