import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { AddressInput } from '@/features/my-page/activity-form/ui/address-input/AddressInput';
import Button from '@/shared/ui/button/Button';

/**
 * 스토리북 테스트를 위해 강제로 에러를 발생시키는 컴포넌트입니다.
 */
function ErrorTrigger() {
  const { setError } = useFormContext();

  useEffect(() => {
    setError('address', { type: 'manual', message: '주소를 작성해주세요' });
    setError('detailAddress', { type: 'manual', message: '상세 주소를 작성해주세요' });
  }, [setError]);

  return null;
}

const meta: Meta<typeof AddressInput> = {
  title: 'Features/MyPage/AddressInput',
  component: AddressInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => {
      type MockFormValues = {
        address: string;
        detailAddress: string;
      };

      const methods = useForm<MockFormValues>({
        defaultValues: {
          address: '',
          detailAddress: '',
        },
      });

      const onSubmit = (data: MockFormValues) => {
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <FormProvider {...methods}>
          <div className="max-w-md bg-white p-4">
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <Story />
              <Button type="submit" theme="primary" size="lg" className="w-full">
                테스트 폼 제출
              </Button>
            </form>
          </div>
        </FormProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

export const Default: Story = {};

export const WithError: Story = {
  render: () => (
    <>
      <AddressInput />
      <ErrorTrigger />
    </>
  ),
};
