'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SearchActivityList from '@/app/(public)/(explore)/(main)/ui/SearchActivityList';
import CategoryFilter from '@/features/activity/main/ui/category-filter/CategoryFilter';
import Pagination from '@/shared/ui/pagination/Pagination';
import Title from '@/shared/ui/title/Title';

const MOCK_DATA = {
  activities: [
    {
      id: 12912,
      userId: 3419,
      title: '함께 배우면',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2026-05-06T15:38:31.557Z',
      updatedAt: '2026-05-06T15:38:31.557Z',
    },
    {
      id: 12911,
      userId: 3419,
      title: '함께 배우면 즐거운 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2026-05-06T15:37:36.505Z',
      updatedAt: '2026-05-06T15:37:36.505Z',
    },
    {
      id: 12910,
      userId: 3417,
      title: '함께 배우면 즐거운 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/22-1_3417_1777887801764.jpeg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2026-05-04T18:18:12.232Z',
      updatedAt: '2026-05-04T18:50:38.604Z',
    },
    {
      id: 12909,
      userId: 3412,
      title:
        '함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 스트릿댄스함께 배우면 즐거운 스트릿댄스함께께',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2026-04-29T02:43:15.270Z',
      updatedAt: '2026-04-29T02:43:15.270Z',
    },
    {
      id: 12908,
      userId: 3412,
      title:
        '함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 스트릿댄스함께 배우면 즐거운 스트릿댄스함께께',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2026-04-29T02:42:57.334Z',
      updatedAt: '2026-04-29T02:42:57.334Z',
    },
    {
      id: 12907,
      userId: 3412,
      title:
        '함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 ',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2026-04-29T02:42:47.274Z',
      updatedAt: '2026-04-29T02:42:47.274Z',
    },
    {
      id: 12906,
      userId: 3412,
      title:
        '함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 스트릿댄스함께 배우면 즐거운',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2026-04-29T02:42:32.246Z',
      updatedAt: '2026-04-29T02:42:32.246Z',
    },
    {
      id: 12905,
      userId: 3412,
      title:
        '함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운 스트릿댄스함께 배우면 즐거운',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 0,
      reviewCount: 0,
      createdAt: '2026-04-29T02:42:13.268Z',
      updatedAt: '2026-04-29T02:42:13.268Z',
    },
  ],
  totalCount: 8,
};
export default function SearchResultSection() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('전체');

  const { activities, totalCount } = MOCK_DATA;

  return (
    <article>
      <div className="mb-5 md:mb-10">
        <Title as="h2" size="18" weight="medium" className="text-gray-950 md:typo-24-medium">
          <span className="typo-18-bold md:typo-24-bold">{keyword}</span>으로 검색한 결과입니다.
        </Title>
        <p className="typo-14-medium text-gray-700 md:typo-18-medium">
          총 <span>{totalCount}</span>개의 결과
        </p>
      </div>
      <CategoryFilter selectedCategory={category} onChangeCategory={setCategory} />
      <div className="mt-6 flex flex-col items-center gap-6 md:gap-7.5">
        <SearchActivityList activities={activities} />
        <Pagination currentPage={page} totalPages={totalCount} onPageChange={setPage} />
      </div>
    </article>
  );
}
