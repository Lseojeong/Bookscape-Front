import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Button from '@/shared/ui/button/Button';
import ReviewModal from './ReviewModal';

const meta: Meta<typeof ReviewModal> = {
  title: 'Features/Reservation/ReviewModal',
  component: ReviewModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ReviewModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-6">
        <Button theme="primary" size="md" onClick={() => setIsOpen(true)}>
          리뷰 모달 열기
        </Button>

        <ReviewModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          activityTitle="함께 배우면 즐거운 스트릿 댄스"
          scheduleText="2023. 02. 14 / 11:00 - 12:30 (10명)"
          onSubmit={async (payload) => {
            // eslint-disable-next-line no-console
            console.log(payload);
          }}
        />
      </div>
    );
  },
};
