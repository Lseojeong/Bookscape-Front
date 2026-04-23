import type { Meta, StoryObj } from '@storybook/nextjs';
import PerPersonPrice from '@/shared/ui/price/PerPersonPrice';
import PriceDisplay from '@/shared/ui/price/PriceDisplay';
import TotalPrice from '@/shared/ui/price/TotalPrice';

function TestPriceInfo() {
  return (
    <>
      <div>
        <PriceDisplay price={38000} unit="인" />
      </div>
      <div className="">
        <PerPersonPrice pricePerPerson={5000} />
      </div>
      <div className="">
        <TotalPrice totalPrice={450000} headCount={8} />
      </div>
    </>
  );
}

const meta: Meta<typeof TestPriceInfo> = {
  title: 'Shared/PriceInfo',
  component: TestPriceInfo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
