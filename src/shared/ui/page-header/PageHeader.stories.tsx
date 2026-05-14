import type { Meta, StoryObj } from '@storybook/nextjs';
import PageHeader from '@/shared/ui/page-header/PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Shared/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '체험활동',
    description: '체험을 탐색하고 예약할 수 있습니다.',
  },
};

export const NoDescription: Story = {
  args: {
    title: '내 체험 등록',
  },
};
