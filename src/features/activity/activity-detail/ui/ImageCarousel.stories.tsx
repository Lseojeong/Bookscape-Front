import type { Meta, StoryObj } from '@storybook/nextjs';
import ImageCarousel from './ImageCarousel';

const meta: Meta<typeof ImageCarousel> = {
  title: 'Features/Activity/Detail/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
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
