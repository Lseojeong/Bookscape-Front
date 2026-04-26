import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { ReservationStatusIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import Input from '@/shared/ui/input/Input';
import PasswordInput from '@/shared/ui/input/PasswordInput';
import PriceInput from '@/shared/ui/input/PriceInput';

type InputPlaygroundProps = {
  label: string;
  labelWeight: 'medium' | 'bold';
  errorMessage: string;
  placeholder: string;
  disabled: boolean;
  isError: boolean;
};

const meta: Meta<InputPlaygroundProps> = {
  title: 'Shared/Input',
  component: Input as unknown as React.ComponentType<InputPlaygroundProps>,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    isError: { control: 'boolean', description: '에러 상태 강제 토글' },
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
    isError: false,
  },
  render: ({ label, labelWeight, errorMessage, ...args }) => {
    type PlaygroundForm = { playgroundInput: string };
    function PlaygroundWrapper() {
      const { control } = useForm<PlaygroundForm>({ defaultValues: { playgroundInput: '' } });

      return (
        <div className="w-100 rounded-xl bg-gray-50 p-8">
          <FormField label={label} labelWeight={labelWeight} errorMessage={errorMessage}>
            <Input<PlaygroundForm> {...args} name="playgroundInput" control={control} />
          </FormField>
        </div>
      );
    }
    return <PlaygroundWrapper />;
  },
};

export const StateTest: Story = {
  render: () => {
    type StateForm = { normal: string; error: string; disabled: string };
    function StateWrapper() {
      const { control } = useForm<StateForm>({
        defaultValues: { normal: '', error: 'wrongpassword', disabled: 'test@email.com' },
      });

      return (
        <div className="flex w-100 flex-col gap-8 rounded-xl bg-gray-50 p-8">
          {/* 기본/타이핑 상태 테스트 */}
          <FormField label="이메일">
            <Input<StateForm> name="normal" control={control} placeholder="example@bookscape.com" />
          </FormField>

          {/* 에러 상태 테스트 */}
          <FormField label="비밀번호" errorMessage="이메일 또는 비밀번호가 일치하지 않습니다.">
            <PasswordInput<StateForm> name="error" control={control} isError />
          </FormField>

          {/* 비활성화 상태 테스트 */}
          <FormField label="이메일">
            <Input<StateForm> name="disabled" control={control} disabled />
          </FormField>
        </div>
      );
    }
    return <StateWrapper />;
  },
};

export const IconTest: Story = {
  render: () => {
    type IconForm = { password: string; date: string };
    function IconWrapper() {
      const { control } = useForm<IconForm>({ defaultValues: { password: '', date: '' } });

      return (
        <div className="flex w-100 flex-col gap-8 rounded-xl bg-gray-50 p-8">
          <FormField label="비밀번호">
            <PasswordInput<IconForm>
              name="password"
              control={control}
              placeholder="비밀번호를 입력하세요"
            />
          </FormField>

          <FormField label="날짜">
            <Input<IconForm>
              name="date"
              control={control}
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
      );
    }
    return <IconWrapper />;
  },
};

export const LabelActionTest: Story = {
  render: () => {
    type ActionForm = { address: string };
    function ActionWrapper() {
      const { control } = useForm<ActionForm>({ defaultValues: { address: '' } });

      return (
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
            <Input<ActionForm>
              name="address"
              control={control}
              placeholder="주소를 입력해 주세요"
              readOnly
            />
          </FormField>
        </div>
      );
    }
    return <ActionWrapper />;
  },
};

export const PriceTest: Story = {
  render: () => {
    type PriceForm = { price: string };
    function PriceWrapper() {
      const { control, watch } = useForm<PriceForm>({ defaultValues: { price: '' } });

      const rawValue = watch('price');

      return (
        <div className="flex w-100 flex-col gap-6 rounded-xl bg-gray-50 p-8">
          <div>
            <FormField label="체험 가격">
              <PriceInput<PriceForm>
                name="price"
                control={control}
                placeholder="금액을 입력해주세요 (숫자만 가능)"
              />
            </FormField>
          </div>

          <p className="typo-14-medium text-gray-600">
            부모 컴포넌트에 저장되는 실제 값: <br />
            <span className="typo-16-bold text-primary-500">rawValue = {rawValue}</span>
          </p>
        </div>
      );
    }
    return <PriceWrapper />;
  },
};
