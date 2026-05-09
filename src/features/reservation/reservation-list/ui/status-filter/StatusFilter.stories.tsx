import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import StatusFilter from '@/features/reservation/reservation-list/ui/status-filter/StatusFilter';
import type { ReservationStatus } from '@/shared/ui/state-badge/StateBadge';

const meta: Meta<typeof StatusFilter> = {
  title: 'Features/Reservation/StatusFilter',
  component: StatusFilter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatusFilter>;

export const Default: Story = {
  render: () => {
    function StoryWrapper() {
      const [status, setStatus] = useState<ReservationStatus | ''>('');
      return (
        <div className="w-fit rounded-xl bg-gray-50 p-8">
          <StatusFilter selectedStatus={status} onSelectStatus={setStatus} />
        </div>
      );
    }
    return <StoryWrapper />;
  },
};
