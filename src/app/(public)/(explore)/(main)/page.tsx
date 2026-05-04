import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainCategoryList from '@/app/(public)/(explore)/(main)/ui/MainCategoryList';
import MainActivityList from '@/features/activity/main/ui/MainActivityList';

// TODO : mock 데이터, api 연결 후 삭제 예정
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
  {
    id: 6,
    bannerImageUrl: 'https://www.snunews.com/news/photo/202110/22511_22281_3629.jpg',
    title: '함께 배우면 즐거운 스트릿댄스',
    reviewCount: 5,
    rating: 4.74,
    price: 10000,
    status: 'confirmed',
  },
  {
    id: 7,
    bannerImageUrl:
      'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/wlQ/image/beMa5cDR98hvK2yd88L4HW1XKEk.jpg',
    title: '제목이 아주 길어지는 경우에는 말줄임표가 적용됩니다',
    reviewCount: 120,
    rating: 3.5,
    price: 25000,
  },
];

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <div className="mx-auto mt-21.5 mb-10 flex max-w-280 flex-col gap-13.25 px-6 md:mt-37.5 md:mb-25 md:gap-28.75 md:px-7.5 xl:px-0">
        <MainCategoryList />
        <MainActivityList activities={MOCK_DATA} />
      </div>
    </div>
  );
}
