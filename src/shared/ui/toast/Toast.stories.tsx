import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Shared/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// 에러 토스트
export const Cancel: Story = {
  args: {
    type: 'cancel',
    message: '작업 중 오류가 발생했습니다.',
    onClose: fn(),
  },
};

// 성공 토스트
export const Check: Story = {
  args: {
    type: 'check',
    message: '작업이 성공적으로 완료되었습니다.',
    onClose: fn(),
  },
};

// 경고 토스트
export const Warning: Story = {
  args: {
    type: 'warning',
    message: '작업 중 문제가 발생했습니다.',
    onClose: fn(),
  },
};
