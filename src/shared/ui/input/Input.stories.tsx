import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ComponentProps } from 'react';
import FormField from '@/shared/ui/form/FormField';
import Input from '@/shared/ui/input/Input';

type InputPlaygroundProps = ComponentProps<typeof Input> & {
  label?: string;
  labelWeight?: 'medium' | 'bold';
  errorMessage?: string;
};

const meta: Meta<InputPlaygroundProps> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text', description: '라벨' },
    labelWeight: { control: 'radio', options: ['medium', 'bold'], description: '라벨 굵기' },
    errorMessage: { control: 'text', description: '에러 메시지' },
  },
};

export default meta;
type Story = StoryObj<InputPlaygroundProps>;

export const Playground: Story = {
  args: {
    label: '이메일',
    labelWeight: 'medium',
    errorMessage: '',
    placeholder: 'test@email.com',
    disabled: false,
  },
  render: ({ label, labelWeight, errorMessage, ...args }) => (
    <div className="w-100 rounded-xl bg-gray-50 p-8">
      <FormField label={label} labelWeight={labelWeight} errorMessage={errorMessage}>
        <Input {...args} />
      </FormField>
    </div>
  ),
};

export const AsFormField: Story = {
  render: () => (
    <div className="flex w-100 flex-col gap-8 rounded-xl bg-gray-50 p-8">
      {/* 기본/타이핑 상태 테스트 */}
      <FormField label="이메일">
        <Input placeholder="example@bookscape.com" />
      </FormField>

      {/* 에러 상태 테스트 */}
      <FormField label="비밀번호" errorMessage="이메일 또는 비밀번호가 일치하지 않습니다.">
        <Input type="password" defaultValue="wrongpassword" />
      </FormField>

      {/* 비활성화 상태 테스트 */}
      <FormField label="이메일">
        <Input disabled value="test@email.com" />
      </FormField>
    </div>
  ),
};
