import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import ActivityCategoryFilter from '@/features/activity/ui/CategoryFilter';
import ReservationStatusFilter from '@/features/reservation/ui/ReservationStatusFilter';
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

export const FilterGroup: Story = {
  render: () => {
    function FilterGroupWrapper() {
      const [category, setCategory] = useState('전체');
      const [status, setStatus] = useState('');

      return (
        <div className="flex w-fit flex-col gap-8 rounded-xl bg-gray-50 p-8">
          {/* 카테고리 필터 그룹 */}
          <div className="flex flex-col gap-3">
            <h3 className="typo-16-bold text-gray-400">Activity Category</h3>
            <ActivityCategoryFilter selectedCategory={category} onChangeCategory={setCategory} />
          </div>

          {/* 예약 상태 필터 그룹 */}
          <div className="flex flex-col gap-3">
            <h3 className="typo-16-bold text-gray-400">Reservation Status</h3>
            <ReservationStatusFilter selectedStatus={status} onSelectStatus={setStatus} />
          </div>
        </div>
      );
    }

    return <FilterGroupWrapper />;
  },
};
