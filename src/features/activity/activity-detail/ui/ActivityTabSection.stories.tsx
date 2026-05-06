import type { Meta, StoryObj } from '@storybook/nextjs';
import ActivityTabSection from './ActivityTabSection';

const meta: Meta<typeof ActivityTabSection> = {
  title: 'Features/Activity/Detail/ActivityTabSection',
  component: ActivityTabSection,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-167.5">
        <Story />
      </div>
    ),
  ],
};
