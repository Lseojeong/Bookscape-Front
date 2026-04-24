import type { Meta, StoryObj } from '@storybook/nextjs';
import ActivityCard from '@/shared/ui/activity-card/ActivityCard';

const meta: Meta<typeof ActivityCard> = {
  title: 'Shared/ActivityCard',
  component: ActivityCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActivityCard>;

const mockActivities = [
  {
    id: 1,
    bannerImageUrl: 'https://www.snunews.com/news/photo/202110/22511_22281_3629.jpg',
    title: '함께 배우면 즐거운 스트릿댄스',
    reviewCount: 5,
    rating: 4.74,
    price: 10000,
  },
  {
    id: 2,
    bannerImageUrl: 'https://www.snunews.com/news/photo/202110/22511_22281_3629.jpg',
    title: '제목이 아주 길어지는 경우에는 말줄임표가 적용됩니다',
    reviewCount: 120,
    rating: 3.5,
    price: 25000,
  },
  {
    id: 3,
    bannerImageUrl: 'https://www.snunews.com/news/photo/202110/22511_22281_3629.jpg',
    title: '짧은 제목',
    reviewCount: 0,
    rating: 0,
    price: 5000,
  },
  {
    id: 4,
    bannerImageUrl: 'https://www.snunews.com/news/photo/202110/22511_22281_3629.jpg',
    title: '한강 야경 보며 즐기는 요트 파티',
    reviewCount: 88,
    rating: 5,
    price: 99000,
  },
];

// 데스크탑: 4열
export const GridDesktop: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {mockActivities.map((activity) => (
        <ActivityCard key={activity.id} {...activity} />
      ))}
    </div>
  ),
};

// 태블릿: 2열
export const GridTablet: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {mockActivities.map((activity) => (
        <ActivityCard key={activity.id} {...activity} />
      ))}
    </div>
  ),
};

// 단일 카드 확인용
export const Single: Story = {
  args: {
    bannerImageUrl: 'https://www.snunews.com/news/photo/202110/22511_22281_3629.jpg',
    title: '함께 배우면 즐거운 스트릿댄스',
    reviewCount: 5,
    rating: 4.74,
    price: 10000,
  },
};
