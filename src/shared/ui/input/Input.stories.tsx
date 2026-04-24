import type { Meta, StoryObj } from '@storybook/nextjs';
import { type ComponentProps } from 'react';
import { ReservationStatusIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import Input from '@/shared/ui/input/Input';
import PasswordInput from '@/shared/ui/input/PasswordInput';

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

export const StateTest: Story = {
  render: () => (
    <div className="flex w-100 flex-col gap-8 rounded-xl bg-gray-50 p-8">
      {/* 기본/타이핑 상태 테스트 */}
      <FormField label="이메일">
        <Input placeholder="example@bookscape.com" />
      </FormField>

      {/* 에러 상태 테스트 */}
      <FormField label="비밀번호" errorMessage="이메일 또는 비밀번호가 일치하지 않습니다.">
        <PasswordInput isError defaultValue="wrongpassword" />
      </FormField>

      {/* 비활성화 상태 테스트 */}
      <FormField label="이메일">
        <Input disabled value="test@email.com" />
      </FormField>
    </div>
  ),
};

export const IconTest: Story = {
  render: () => (
    <div className="flex w-100 flex-col gap-8 rounded-xl bg-gray-50 p-8">
      <FormField label="비밀번호">
        <PasswordInput placeholder="비밀번호를 입력하세요" />
      </FormField>

      <FormField label="날짜">
        <Input
          type="text"
          placeholder="yy/mm/dd"
          readOnly
          rightElement={
            <button type="button">
              <ReservationStatusIcon />
            </button>
          }
        />
      </FormField>
    </div>
  ),
};

export const LabelActionTest: Story = {
  render: () => (
    <div className="w-100 rounded-xl bg-gray-50 p-8">
      <FormField
        label="주소"
        labelAction={
          <Button
            type="button"
            size="sm"
            className="rounded-lg typo-12-medium"
            onClick={() => alert('우편번호 찾기 팝업 띄우기')}
          >
            우편 번호 찾기
          </Button>
        }
      >
        <Input placeholder="주소를 입력해 주세요" readOnly />
      </FormField>
    </div>
  ),
};
