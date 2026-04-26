import type { Meta, StoryObj } from '@storybook/nextjs';
import ReservationCard, {
  ReservationCardData,
} from '@/shared/ui/card/reservation-card/ReservationCard';

const meta: Meta<typeof ReservationCard> = {
  title: 'Shared/Card/ReservationCard',
  component: ReservationCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ReservationCard>;

const mockReservations: ReservationCardData[] = [
  {
    id: 1,
    nickname: '김민준',
    userId: 101,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity1/400/300',
      title: '함께 배우면 즐거운 스트릿댄스',
      id: 201,
    },
    teamId: 'team-alpha',
    activityId: 201,
    scheduleId: 301,
    status: 'confirmed',
    reviewSubmitted: false,
    totalPrice: 50000,
    headCount: 2,
    date: '2026-05-10',
    startTime: '10:00',
    endTime: '12:00',
  },
  {
    id: 2,
    nickname: '이수경',
    userId: 102,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity2/400/300',
      title: '한강 야경 보며 즐기는 요트 파티',
      id: 202,
    },
    teamId: 'team-beta',
    activityId: 202,
    scheduleId: 302,
    status: 'pending',
    reviewSubmitted: false,
    totalPrice: 99000,
    headCount: 4,
    date: '2026-05-15',
    startTime: '18:00',
    endTime: '21:00',
  },
  {
    id: 3,
    nickname: '박지훈',
    userId: 103,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity3/400/300',
      title: '초보자를 위한 서핑 클래스',
      id: 203,
    },
    teamId: 'team-gamma',
    activityId: 203,
    scheduleId: 303,
    status: 'completed',
    reviewSubmitted: true,
    totalPrice: 75000,
    headCount: 1,
    date: '2026-04-20',
    startTime: '09:00',
    endTime: '11:00',
  },
  {
    id: 6,
    nickname: '박지훈',
    userId: 103,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity3/400/300',
      title: '초보자를 위한 서핑 클래스',
      id: 203,
    },
    teamId: 'team-gamma',
    activityId: 203,
    scheduleId: 303,
    status: 'completed',
    reviewSubmitted: false,
    totalPrice: 75000,
    headCount: 1,
    date: '2026-04-20',
    startTime: '09:00',
    endTime: '11:00',
  },
  {
    id: 4,
    nickname: '최유나',
    userId: 104,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity4/400/300',
      title: '전통 도자기 만들기 원데이 클래스',
      id: 204,
    },
    teamId: 'team-delta',
    activityId: 204,
    scheduleId: 304,
    status: 'declined',
    reviewSubmitted: false,
    totalPrice: 35000,
    headCount: 3,
    date: '2026-05-01',
    startTime: '14:00',
    endTime: '16:00',
  },
  {
    id: 5,
    nickname: '정도현',
    userId: 105,
    activity: {
      bannerImageUrl: 'https://picsum.photos/seed/activity5/400/300',
      title: '제주 올레길 트레킹 투어',
      id: 205,
    },
    teamId: 'team-epsilon',
    activityId: 205,
    scheduleId: 305,
    status: 'canceled',
    reviewSubmitted: false,
    totalPrice: 120000,
    headCount: 5,
    date: '2026-06-01',
    startTime: '07:00',
    endTime: '13:00',
  },
];
// 예약 내역 카드
export const Reservation: Story = {
  render: () => (
    <div className="flex w-100 flex-col gap-5 md:w-130 md:gap-5 lg:w-170">
      {mockReservations.map((data) => (
        <ReservationCard key={data.activity.id} data={data} />
      ))}
    </div>
  ),
};
