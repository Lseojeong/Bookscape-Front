import type { Meta, StoryObj } from '@storybook/nextjs';
import ReservationCard from '@/features/reservation/reservation-list/ui/reservation-card/ReservationCard';
import type { MyReservation } from '@/features/reservation/types';

const meta: Meta<typeof ReservationCard> = {
  title: 'Features/Card/ReservationCard',
  component: ReservationCard,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: () => {},
        replace: () => {},
        back: () => {},
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReservationCard>;

const mockReservations: MyReservation[] = [
  {
    id: 1,
    userId: 101,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity1/400/300',
      title: '함께 배우면 즐거운 스트릿댄스',
      id: 201,
    },
    teamId: 'team-alpha',
    scheduleId: 301,
    status: 'confirmed',
    reviewSubmitted: false,
    totalPrice: 50000,
    headCount: 2,
    date: '2026-05-10',
    startTime: '10:00',
    endTime: '12:00',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    id: 2,
    userId: 102,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity2/400/300',
      title: '한강 야경 보며 즐기는 요트 파티',
      id: 202,
    },
    teamId: 'team-beta',
    scheduleId: 302,
    status: 'pending',
    reviewSubmitted: false,
    totalPrice: 99000,
    headCount: 4,
    date: '2026-05-15',
    startTime: '18:00',
    endTime: '21:00',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    id: 3,
    userId: 103,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity3/400/300',
      title: '초보자를 위한 서핑 클래스',
      id: 203,
    },
    teamId: 'team-gamma',
    scheduleId: 303,
    status: 'completed',
    reviewSubmitted: true,
    totalPrice: 75000,
    headCount: 1,
    date: '2026-04-20',
    startTime: '09:00',
    endTime: '11:00',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    id: 6,
    userId: 103,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity3/400/300',
      title: '초보자를 위한 서핑 클래스',
      id: 203,
    },
    teamId: 'team-gamma',
    scheduleId: 303,
    status: 'completed',
    reviewSubmitted: false,
    totalPrice: 75000,
    headCount: 1,
    date: '2026-04-20',
    startTime: '09:00',
    endTime: '11:00',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    id: 4,
    userId: 104,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity4/400/300',
      title: '전통 도자기 만들기 원데이 클래스',
      id: 204,
    },
    teamId: 'team-delta',
    scheduleId: 304,
    status: 'declined',
    reviewSubmitted: false,
    totalPrice: 35000,
    headCount: 3,
    date: '2026-05-01',
    startTime: '14:00',
    endTime: '16:00',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    id: 5,
    userId: 105,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity5/400/300',
      title: '제주 올레길 트레킹 투어',
      id: 205,
    },
    teamId: 'team-epsilon',
    scheduleId: 305,
    status: 'canceled',
    reviewSubmitted: false,
    totalPrice: 120000,
    headCount: 5,
    date: '2026-06-01',
    startTime: '07:00',
    endTime: '13:00',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
  },
];

// 예약 내역 카드
export const Reservation: Story = {
  render: () => (
    <div className="flex w-100 flex-col gap-5 md:w-130 md:gap-5 lg:w-170">
      {mockReservations.map((data) => (
        <ReservationCard key={data.id} data={data} />
      ))}
    </div>
  ),
};
