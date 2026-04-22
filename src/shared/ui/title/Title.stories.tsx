import type { Meta, StoryObj } from '@storybook/nextjs';
import Title from '@/shared/ui/title/Title';

const meta: Meta<typeof Title> = {
  title: 'Shared/Title',
  component: Title,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'h2',
    size: '20',
    weight: 'bold',
    children: '타이틀 텍스트',
  },
};
