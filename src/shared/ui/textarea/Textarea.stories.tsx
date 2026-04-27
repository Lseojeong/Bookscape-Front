import type { Meta, StoryObj } from '@storybook/nextjs';
import Textarea from '@/shared/ui/textarea/Textarea';

/**
 * 폼 입력을 위한 다목적 Textarea 컴포넌트입니다.
 *
 * `variants`를 통해 체험 등록용(기본)과 리뷰용 스타일을 제공하며,
 * `maxLength` 속성을 전달하면 우측 하단에 실시간 글자 수 카운터가 자동으로 생성됩니다.
 *
 * @example
 * ```tsx
 * // 기본형
 * <Textarea
 * placeholder="체험에 대한 설명을 입력해 주세요"
 * />
 *
 * // 글자 수 제한 및 카운터 표시
 * <Textarea
 * variants="review"
 * maxLength={100}
 * placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
 * />
 * ```
 */
const meta: Meta<typeof Textarea> = {
  title: 'Shared/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['activity', 'review'],
      description: '컴포넌트의 쓰임새에 따른 스타일 변형',
    },
    maxLength: {
      control: 'number',
      description: '최대 글자 수',
    },
    placeholder: {
      control: 'text',
      description: '입력 전 표시될 안내 문구',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Activity: Story = {
  args: {
    variant: 'activity',
    placeholder: '체험에 대한 설명을 입력해 주세요',
  },
};

export const Review: Story = {
  args: {
    variant: 'review',
    maxLength: 100,
    placeholder: '체험에서 느낀 경험을 자유롭게 남겨주세요',
  },
};
