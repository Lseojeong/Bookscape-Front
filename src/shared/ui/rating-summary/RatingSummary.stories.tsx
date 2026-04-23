import type { Meta, StoryObj } from '@storybook/nextjs';
import RatingSummary from '@/shared/ui/rating-summary/RatingSummary';

const meta: Meta<typeof RatingSummary> = {
  title: 'Shared/RatingSummary',
  component: RatingSummary,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RatingSummary>;

export const Rating: Story = {
  render: (args) => <RatingSummary {...args} />,
  args: {
    averageRating: 4.2,
    totalCount: 672,
  },
};
