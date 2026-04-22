import type { Meta, StoryObj } from '@storybook/nextjs';
import StateBadge from '@/shared/ui/state-badge/StateBadge';

const meta: Meta<typeof StateBadge> = {
  title: 'Shared/StateBadge',
  component: StateBadge,
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'confirmed', 'completed', 'declined', 'canceled'],
      description: 'API에서 오는 예약 상태값',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'pending',
  },
};

export const Pending: Story = {
  args: { status: 'pending' },
};

export const Confirmed: Story = {
  args: { status: 'confirmed' },
};

export const Completed: Story = {
  args: { status: 'completed' },
};

export const Declined: Story = {
  args: { status: 'declined' },
};

export const Canceled: Story = {
  args: { status: 'canceled' },
};

/** 전체 상태 한눈에 보기 */
export const AllStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <StateBadge status="pending" />
      <StateBadge status="confirmed" />
      <StateBadge status="completed" />
      <StateBadge status="declined" />
      <StateBadge status="canceled" />
    </div>
  ),
};
