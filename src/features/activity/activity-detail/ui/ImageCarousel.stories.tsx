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
  args: {
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/22-1_3417_1777887801764.jpeg',
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/22-1_3417_1777887831214.jpeg',
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/22-1_3417_1777888188557.jpeg',
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-167.5">
        <Story />
      </div>
    ),
  ],
};
