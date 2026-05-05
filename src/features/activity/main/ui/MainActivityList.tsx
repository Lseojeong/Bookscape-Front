'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useHorizontalScroll from '@/features/activity/main/hooks/useHorizontalScroll';
import ActivityCard from '@/features/activity/main/ui/activity-card/ActivityCard';
import { ActivityData, ActivityResponse } from '@/features/activity/types';
import { get } from '@/shared/apis/base/publicFetch';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

/**
 * 메인 페이지 인기 체험 목록 컴포넌트입니다.
 * 리뷰 많은 순으로 체험 목록을 조회하며, 가로 슬라이드 및 드래그 스크롤을 지원합니다.
 *
 * @example
 * ```tsx
 * <MainActivityList />
 * ```
 */
export default function MainActivityList() {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        // TODO : 호출 개수 정해야함!
        const ACTIVITY_FETCH_LIMIT = 8;
        const result = await get<ActivityResponse>(
          `/activities?method=offset&sort=most_reviewed&size=${ACTIVITY_FETCH_LIMIT}`
        );
        setActivityData(result?.activities ?? []);
      } catch {}
    };
    fetchActivityData();
  }, []);

  const { scrollRef, scrollState, handleScroll, updateScrollState, dragEvents } =
    useHorizontalScroll(activityData.length);

  // 이전/다음 버튼 공통 스타일
  const btnBaseStyle =
    'absolute top-1/2 z-10 hidden sm:flex h-13.5 w-13.5 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-opacity hover:bg-gray-50';

  return (
    <section className="flex w-full flex-col gap-5 py-8">
      <h2 className="typo-18-bold text-gray-950 md:typo-32-bold">
        🔥 <span className="text-secondary-500">HOT</span> 인기 체험
      </h2>
      <div className="group relative">
        {/* 왼쪽 버튼 */}
        {scrollState.canLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className={cn(btnBaseStyle, '-left-5')}
            aria-label="이전"
          >
            <ArrowLeftIcon />
          </button>
        )}
        <div
          ref={scrollRef}
          className="scrollbar-hide overflow-x-auto pb-4"
          onScroll={updateScrollState}
          {...dragEvents}
        >
          <ul className="flex gap-4 md:gap-5 lg:gap-6">
            {activityData.map((data) => {
              return (
                <li
                  key={data.id}
                  className="w-[calc((100%-50px*2)/2)] min-w-50 flex-none md:w-[calc((100%-20px*1)/2)] lg:w-[calc((100%-24px*3)/4)]"
                >
                  <Link href={`/activity/${data.id}`}>
                    <ActivityCard data={data} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* 오른쪽 버튼 */}
        {scrollState.canRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className={cn(btnBaseStyle, '-right-5')}
            aria-label="다음"
          >
            <ArrowRightIcon />
          </button>
        )}
      </div>
    </section>
  );
}
