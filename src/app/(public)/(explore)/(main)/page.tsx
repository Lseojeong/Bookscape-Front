'use client';
import { useEffect, useState } from 'react';
import HeroBanner from '@/app/(public)/(explore)/(main)/ui/HeroBanner';
import MainCategoryList from '@/app/(public)/(explore)/(main)/ui/MainCategoryList';
import MainActivityList from '@/features/activity/main/ui/MainActivityList';
import { ActivityData, ActivityResponse } from '@/features/activity/types';
import { get } from '@/shared/apis/base/publicFetch';

export default function Home() {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        // TODO : 호출 개수 정해야함!
        const result = await get<ActivityResponse>(
          '/activities?method=offset&sort=most_reviewed&size=8'
        );
        setActivityData(result?.activities ?? []);
      } catch (e) {
        console.error(e);
      } finally {
      }
    };
    fetchActivityData();
  }, []);

  return (
    <div>
      <HeroBanner />
      <div className="mx-auto mt-21.5 mb-10 flex max-w-280 flex-col gap-13.25 px-6 md:mt-37.5 md:mb-25 md:gap-28.75 md:px-7.5 xl:px-0">
        <MainCategoryList />
        <MainActivityList activities={activityData} />
      </div>
    </div>
  );
}
