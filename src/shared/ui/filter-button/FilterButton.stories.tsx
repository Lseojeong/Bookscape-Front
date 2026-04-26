import type { Meta, StoryObj } from '@storybook/nextjs';
import FilterButton from '@/shared/ui/filter-button/FilterButton';

const meta: Meta<typeof FilterButton> = {
  title: 'Shared/FilterButton',
  component: FilterButton,
  tags: ['autodocs'],
  argTypes: {
    isSelected: { control: 'boolean', description: '선택 활성화 여부' },
    children: { control: 'text', description: '필터 텍스트 내용' },
    onClick: { action: 'clicked', description: '클릭 이벤트 핸들러' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterButton>;

export const Playground: Story = {
  args: {
    children: '예약 완료',
    isSelected: false,
  },
  render: (args) => (
    <div className="w-fit rounded-xl bg-gray-50 p-8">
      <FilterButton {...args} />
    </div>
  ),
};
