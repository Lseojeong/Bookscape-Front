import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import CategoryFilter from '@/features/activity/ui/category-filter/CategoryFilter';

const meta: Meta<typeof CategoryFilter> = {
  title: 'Features/Activity/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CategoryFilter>;

export const Default: Story = {
  render: () => {
    function StoryWrapper() {
      const [category, setCategory] = useState('전체');
      return (
        <div className="w-fit rounded-xl bg-gray-50 p-8">
          <CategoryFilter selectedCategory={category} onChangeCategory={setCategory} />
        </div>
      );
    }
    return <StoryWrapper />;
  },
};
