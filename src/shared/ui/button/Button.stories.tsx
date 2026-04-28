import type { Meta, StoryObj } from '@storybook/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { PlusIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'gray'],
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'icon'],
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: '버튼',
    theme: 'primary',
    size: 'md',
    disabled: false,
    isLoading: false,
  },
};

export const Loading: Story = {
  render: () => {
    const [loadingKey, setLoadingKey] = useState<'primary' | 'secondary' | 'gray' | 'icon' | null>(
      null
    );

    const run = (key: NonNullable<typeof loadingKey>) => {
      setLoadingKey(key);
      window.setTimeout(() => setLoadingKey(null), 1200);
    };

    return (
      <div className="flex flex-col items-start gap-4 rounded-xl bg-gray-100 p-8">
        <Button
          theme="primary"
          size="md"
          isLoading={loadingKey === 'primary'}
          onClick={() => run('primary')}
        >
          Primary Loading
        </Button>
        <Button
          theme="secondary"
          size="lg"
          isLoading={loadingKey === 'secondary'}
          onClick={() => run('secondary')}
        >
          Secondary Loading
        </Button>
        <Button
          theme="gray"
          size="md"
          isLoading={loadingKey === 'gray'}
          onClick={() => run('gray')}
        >
          Gray Loading
        </Button>
        <Button
          theme="primary"
          size="icon"
          aria-label="Icon loading"
          isLoading={loadingKey === 'icon'}
          onClick={() => run('icon')}
        >
          <PlusIcon />
        </Button>
      </div>
    );
  },
};

// 사이즈별 기본 버튼
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4 rounded-xl bg-gray-100 p-8">
      <Button size="lg">예약하기</Button>
      <Button size="md">저장하기</Button>
      <Button size="sm">수정하기</Button>
      <Button size="icon">
        <PlusIcon />
      </Button>
    </div>
  ),
};

// 테마별 기본 버튼
export const Themes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4 rounded-xl bg-gray-100 p-8">
      <Button theme="primary" size="md">
        Primary
      </Button>
      <Button theme="secondary" size="md">
        Secondary
      </Button>
      <Button theme="gray" size="md">
        Gray
      </Button>
    </div>
  ),
};

// className 덮어쓰기 예시
export const Overridden: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4 bg-pink-200 p-8">
      <Button
        as={Link}
        href="/activities"
        size="lg"
        theme="gray"
        className="h-14 w-86.5 rounded-[50px] bg-white typo-20-medium text-primary-700"
      >
        지금 바로 체험 보러 가기
      </Button>
      <Button size="md" theme="primary" className="w-92.5 rounded-xl">
        등록하기
      </Button>
      <Button size="md" theme="secondary" className="h-10.75 typo-14-medium">
        취소하기
      </Button>
      <Button size="sm" theme="gray" className="h-7.25 w-17 rounded-lg">
        삭제하기
      </Button>
      <Button size="icon" theme="primary" className="h-7 w-7">
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// 비활성화 상태 테스트
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4 rounded-xl bg-pink-200 p-8">
      <Button size="lg" theme="primary" disabled className="h-13.5 w-160 rounded-2xl">
        로그인하기
      </Button>
    </div>
  ),
};
