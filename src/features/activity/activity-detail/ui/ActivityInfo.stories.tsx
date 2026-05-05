import type { Meta, StoryObj } from '@storybook/nextjs';
import ActivityInfo from './ActivityInfo';

const meta: Meta<typeof ActivityInfo> = {
  title: 'Features/Activity/Detail/ActivityInfo',
  component: ActivityInfo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: '문화 · 예술',
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 4.9,
    reviewCount: 293,
    address: '서울 중구 청계천로 100 10F',
  },
  decorators: [
    (Story) => (
      <div className="w-167.5">
        <Story />
      </div>
    ),
  ],
};
