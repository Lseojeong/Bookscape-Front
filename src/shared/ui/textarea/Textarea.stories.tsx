import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import FormField from '@/shared/ui/form/FormField';
import FormTextarea from '@/shared/ui/form/FormTextarea';
import Textarea from '@/shared/ui/textarea/Textarea';

type TextareaPlaygroundProps = React.ComponentProps<typeof Textarea> & {
  label?: string;
  errorMessage?: string;
};

const meta: Meta<TextareaPlaygroundProps> = {
  title: 'Shared/Textarea',
  component: Textarea as unknown as React.ComponentType<TextareaPlaygroundProps>,
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
    label: { control: 'text', description: '라벨' },
    errorMessage: { control: 'text', description: '에러 메시지' },
  },
};

export default meta;
type Story = StoryObj<TextareaPlaygroundProps>;

export const Activity: Story = {
  args: {
    variant: 'activity',
    placeholder: '체험에 대한 설명을 입력해 주세요',
    label: '상세 설명',
    errorMessage: '',
  },
  render: ({ label, errorMessage, variant, placeholder, maxLength }) => {
    type ActivityForm = { description: string };

    function ActivityWrapper() {
      const { control } = useForm<ActivityForm>({ defaultValues: { description: '' } });

      return (
        <div className="w-100 rounded-xl bg-gray-50 p-8">
          <FormField label={label} errorMessage={errorMessage}>
            <FormTextarea<ActivityForm>
              variant={variant}
              placeholder={placeholder}
              maxLength={maxLength}
              name="description"
              control={control}
            />
          </FormField>
        </div>
      );
    }
    return <ActivityWrapper />;
  },
};

export const Review: Story = {
  args: {
    variant: 'review',
    maxLength: 100,
    placeholder: '체험에서 느낀 경험을 자유롭게 남겨주세요',
    label: '리뷰 작성',
    errorMessage: '',
    isError: false,
  },
  render: ({ label, errorMessage, variant, placeholder, maxLength }) => {
    type ReviewForm = { review: string };

    function ReviewWrapper() {
      const { control } = useForm<ReviewForm>({ defaultValues: { review: '' } });

      return (
        <div className="w-100 rounded-xl bg-gray-50 p-8">
          <FormField label={label} errorMessage={errorMessage}>
            <FormTextarea<ReviewForm>
              variant={variant}
              placeholder={placeholder}
              maxLength={maxLength}
              name="review"
              control={control}
            />
          </FormField>
        </div>
      );
    }
    return <ReviewWrapper />;
  },
};
