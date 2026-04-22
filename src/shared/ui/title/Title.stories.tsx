import type { Meta, StoryObj } from '@storybook/nextjs';
import Title from './Title';

const meta: Meta<typeof Title> = {
  title: 'shared/ui/title/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
      description: '렌더링할 HTML 헤딩 태그',
      table: {
        defaultValue: { summary: 'h2' },
      },
    },
    size: {
      control: 'select',
      options: ['14', '16', '18', '20', '24', '32'],
      description: '텍스트 크기 (px 단위)',
      table: {
        defaultValue: { summary: '20' },
      },
    },
    weight: {
      control: 'select',
      options: ['medium', 'bold'],
      description: '텍스트 굵기',
      table: {
        defaultValue: { summary: 'bold' },
      },
    },
    color: {
      control: 'text',
      description: '텍스트 색상 (Tailwind 클래스)',
      table: {
        defaultValue: { summary: 'text-black-200' },
      },
    },
    children: {
      control: 'text',
      description: '타이틀 텍스트',
    },
  },
  args: {
    children: '타이틀 텍스트',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 타이틀 */
export const Default: Story = {
  args: {
    as: 'h2',
    size: '20',
    weight: 'bold',
  },
};

/** 크기별 타이틀 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Title size="14" weight="bold">
        size 14 - bold
      </Title>
      <Title size="16" weight="bold">
        size 16 - bold
      </Title>
      <Title size="18" weight="bold">
        size 18 - bold
      </Title>
      <Title size="20" weight="bold">
        size 20 - bold
      </Title>
      <Title size="24" weight="bold">
        size 24 - bold
      </Title>
      <Title size="32" weight="bold">
        size 32 - bold
      </Title>
    </div>
  ),
};

/** 굵기별 타이틀 */
export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Title size="24" weight="medium">
        size 24 - medium
      </Title>
      <Title size="24" weight="bold">
        size 24 - bold
      </Title>
    </div>
  ),
};

/** 태그별 타이틀 */
export const HeadingTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Title as="h2" size="24" weight="bold">
        h2 태그
      </Title>
      <Title as="h3" size="20" weight="bold">
        h3 태그
      </Title>
      <Title as="h4" size="18" weight="bold">
        h4 태그
      </Title>
      <Title as="h5" size="16" weight="bold">
        h5 태그
      </Title>
      <Title as="h6" size="14" weight="bold">
        h6 태그
      </Title>
    </div>
  ),
};

/** 접근성 속성 사용 예시 */
export const WithA11y: Story = {
  args: {
    as: 'h2',
    size: '24',
    weight: 'bold',
    'aria-label': '접근성 타이틀',
    id: 'main-title',
    children: '접근성 속성 사용 예시',
  },
};
