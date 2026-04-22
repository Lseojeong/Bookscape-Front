import type { Meta, StoryObj } from '@storybook/nextjs';

function Pagination() {
  return <div>Pagination</div>;
}

const meta: Meta<typeof Pagination> = {
  title: 'Example/Pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
