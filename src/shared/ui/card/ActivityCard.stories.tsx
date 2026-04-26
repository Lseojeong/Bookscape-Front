import type { Meta, StoryObj } from '@storybook/nextjs';
import ActivityCard from '@/shared/ui/card/ActivityCard';
import MyActivityCard from '@/shared/ui/card/my-activity-card/MyActivityCard';

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
    status: 'confirmed',
  },
  {
    id: 2,
    bannerImageUrl:
      'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/wlQ/image/beMa5cDR98hvK2yd88L4HW1XKEk.jpg',
    title: '제목이 아주 길어지는 경우에는 말줄임표가 적용됩니다',
    reviewCount: 120,
    rating: 3.5,
    price: 25000,
  },
  {
    id: 3,
    bannerImageUrl:
      'https://www.fitpetmall.com/wp-content/uploads/2023/10/GettyImages-492548888-1.png',
    title: '짧은 제목',
    reviewCount: 0,
    rating: 0,
    price: 5000,
  },
  {
    id: 4,
    bannerImageUrl: 'https://www.millim.in/data/ckeditor/f91dfe19c3731cc8a91654bf2dab608b.jpeg',
    title: '한강 야경 보며 즐기는 요트 파티',
    reviewCount: 88,
    rating: 5,
    price: 99000,
  },
];
// 내 체험 관리 카드
export const MyActivity: Story = {
  render: () => (
    <div className="grid gap-6">
      {mockActivities.map((activity) => (
        <MyActivityCard key={activity.id} data={activity} />
      ))}
    </div>
  ),
};

// 반응형 적용
// export const BreakPoint: Story = {
//   render: () => (
//     <div className="grid w-75 min-w-75 grid-cols-2 gap-5 md:w-186 md:gap-5 lg:w-230 lg:grid-cols-4 lg:gap-6">
//       {mockActivities.map((activity) => (
//         <ActivityCard key={activity.id} data={activity} />
//       ))}
//     </div>
//   ),
// };

// 데스크탑: 4열
export const GridDesktop: Story = {
  render: () => (
    <div className="grid min-w-220 grid-cols-4 gap-6">
      {mockActivities.map((activity) => (
        <ActivityCard key={activity.id} data={activity} />
      ))}
    </div>
  ),
};

// // 태블릿: 2열
// export const GridTablet: Story = {
//   render: () => (
//     <div className="grid min-w-186 grid-cols-2 gap-5">
//       {mockActivities.map((activity) => (
//         <ActivityCard key={activity.id} data={activity} />
//       ))}
//     </div>
//   ),
// };
