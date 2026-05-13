import type { Meta, StoryObj } from '@storybook/nextjs';
import ReviewSummary from './ReviewSummary';

const meta: Meta<typeof ReviewSummary> = {
  title: 'Features/Activity/Detail/ReviewSummary',
  component: ReviewSummary,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    averageRating: 4.2,
    totalCount: 1300,
  },
};
