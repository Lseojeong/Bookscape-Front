import type { Meta, StoryObj } from '@storybook/nextjs';
import SearchInputUi from '@/shared/ui/search-input/SearchInputUi';

const meta: Meta<typeof SearchInputUi> = {
  title: 'Shared/SearchInput',
  component: SearchInputUi,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchInputUi>;

export const Default: Story = {
  args: {
    defaultValue: '',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '서울 여행',
  },
};
