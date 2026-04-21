import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Symbol> = {
  title: 'Example/TestButton',
  component: () => (
    <button style={{ backgroundColor: 'orange', padding: '10px' }}>배포 오류 방지 샘플</button>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
