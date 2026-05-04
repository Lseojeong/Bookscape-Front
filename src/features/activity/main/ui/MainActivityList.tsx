import ActivityCard from '@/features/activity/main/ui/activity-card/ActivityCard';

const MOCK_DATA = [
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
  {
    id: 5,
    bannerImageUrl: 'https://www.millim.in/data/ckeditor/f91dfe19c3731cc8a91654bf2dab608b.jpeg',
    title: '한강 야경 보며 즐기는 요트 파티',
    reviewCount: 88,
    rating: 5,
    price: 99000,
  },
];
export default function MainActivityList() {
  return (
    <section className="flex w-full flex-col gap-5 overflow-hidden py-8">
      <h2 className="typo-32-bold text-gray-950">
        🔥 <span className="text-secondary-500">HOT</span> 인기 체험
      </h2>
      <div className="scrollbar-hide overflow-x-auto pb-4">
        <ul className="flex gap-4 md:gap-5 lg:gap-6">
          {MOCK_DATA.map((data) => {
            return (
              <li
                key={data.id}
                className="w-[calc((100%-50px*2)/2)] min-w-50 flex-none md:w-[calc((100%-20px*1)/2)] lg:w-[calc((100%-24px*3)/4)]"
              >
                <ActivityCard data={data} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
