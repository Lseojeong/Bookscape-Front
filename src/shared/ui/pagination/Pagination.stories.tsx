import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Pagination from '@/shared/ui/pagination/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Shared/Pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 10,
    currentPage: 1,
    pageGroupSize: 5,
  },
};
