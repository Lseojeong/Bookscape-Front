import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import ScheduleSelector from '@/features/my-page/activity-form/ui/schedule-selector/ScheduleSelector';

const StorybookFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      schedules: [],
    },
  });

  const watchedSchedules = useWatch({
    control: methods.control,
    name: 'schedules',
  });

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-75 rounded-xl bg-white p-4 shadow-sm sm:w-125 sm:p-6 md:max-w-3xl">
        {children}

        <div className="mt-10 rounded-xl bg-gray-50 p-5">
          <h3 className="mb-3 font-bold text-gray-800">{'실시간 폼 데이터'}</h3>
          <pre className="min-h-25 overflow-auto rounded-lg bg-gray-800 p-4 text-sm text-green-400">
            {JSON.stringify(watchedSchedules, null, 2)}
          </pre>
        </div>
      </div>
    </FormProvider>
  );
};

const meta: Meta<typeof ScheduleSelector> = {
  title: 'Features/MyPage/ScheduleSelector',
  component: ScheduleSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <StorybookFormProvider>
        <Story />
      </StorybookFormProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleSelector>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '아무 날짜도 선택되지 않은 기본 상태입니다. 달력 아이콘을 클릭하여 테스트하세요.',
      },
    },
  },
};
