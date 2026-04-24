import type { Meta, StoryObj } from '@storybook/nextjs';
import PriceDisplay from '@/shared/ui/price/PriceDisplay';

const meta: Meta<typeof PriceDisplay> = {
  title: 'Shared/PriceInfo',
  component: PriceDisplay,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PriceDisplay>;

// 가격/인
export const PriceBase: Story = {
  render: (args) => <PriceDisplay {...args} />,
  args: {
    price: 38000,
    unit: '인',
  },
};
