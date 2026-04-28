import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import FormField from '@/shared/ui/form/FormField';
import FormTextarea from '@/shared/ui/form/FormTextarea';
import Textarea from '@/shared/ui/textarea/Textarea';

type TextareaPlaygroundProps = React.ComponentProps<typeof Textarea> & {
  label?: string;
  errorMessage?: string;
  isError?: boolean;
};

const meta: Meta<TextareaPlaygroundProps> = {
  title: 'Shared/Textarea',
  component: Textarea as unknown as React.ComponentType<TextareaPlaygroundProps>,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
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
    label: { control: 'text', description: '라벨' },
    errorMessage: { control: 'text', description: '에러 메시지' },
    isError: { control: 'boolean', description: '에러 상태 강제 토글' },
  },
};

export default meta;
type Story = StoryObj<TextareaPlaygroundProps>;

export const Activity: Story = {
  args: {
    variant: 'activity',
    placeholder: '체험에 대한 설명을 입력해 주세요',
    label: '설명',
    errorMessage: '',
    isError: undefined,
  },
  render: function Render(args) {
    const { control } = useForm<{ description: string }>({
      defaultValues: { description: '' },
    });

    return (
      <div className="w-full max-w-100 rounded-xl bg-gray-50 p-8">
        <FormField label={args.label} errorMessage={args.errorMessage}>
          <FormTextarea
            variant={args.variant}
            placeholder={args.placeholder}
            maxLength={args.maxLength}
            name="description"
            control={control}
            isError={args.isError}
          />
        </FormField>
      </div>
    );
  },
};

export const Review: Story = {
  args: {
    variant: 'review',
    maxLength: 100,
    placeholder: '체험에서 느낀 경험을 자유롭게 남겨주세요',
    label: '소중한 경험을 들려주세요',
    errorMessage: '',
    isError: undefined,
  },
  // 💡 수정: 동일하게 내부 Wrapper 선언을 제거합니다.
  render: function Render(args) {
    const { control } = useForm<{ review: string }>({
      defaultValues: { review: '' },
    });

    return (
      <div className="w-full max-w-100 rounded-xl bg-gray-50 p-8">
        <FormField
          label={args.label}
          errorMessage={args.errorMessage}
          labelClassName="mb-3 md:mb-4"
          labelWeight="bold"
          labelTextClassName="md:typo-18-bold"
        >
          <FormTextarea
            variant={args.variant}
            placeholder={args.placeholder}
            maxLength={args.maxLength}
            name="review"
            control={control}
            isError={args.isError}
          />
        </FormField>
      </div>
    );
  },
};
