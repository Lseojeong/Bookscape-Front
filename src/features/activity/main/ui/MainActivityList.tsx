'use client';
import Link from 'next/link';
import useMainActivityCarousel from '@/features/activity/main/hooks/useMainActivityCarousel';
import ActivityCard from '@/features/activity/main/ui/activity-card/ActivityCard';
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
  const { emblaRef, activityData, canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useMainActivityCarousel();

  // 이전/다음 버튼 공통 스타일
  const btnBaseStyle = cn(
    // 레이아웃
    'absolute top-1/2 z-10 -translate-y-1/2',
    // 크기 & 모양
    'h-13.5 w-13.5 rounded-full',
    // 색상 & 테두리
    'border border-gray-100 bg-white',
    // 효과
    'shadow-lg transition-opacity',
    // 반응형
    'hidden items-center justify-center sm:flex',
    // 상태
    'hover:bg-gray-50',
    'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-50 disabled:opacity-50'
  );

  return (
    <section className="flex w-full flex-col gap-5 py-8">
      <h2 className="typo-18-bold text-gray-950 md:typo-32-bold">
        🔥 <span className="text-secondary-500">HOT</span> 인기 체험
      </h2>
      <div className="group relative">
        {/* 왼쪽 버튼 */}
        {/* {canScrollPrev && ( */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={cn(btnBaseStyle, '-left-5')}
          aria-label="이전"
        >
          <ArrowLeftIcon />
        </button>
        {/* )} */}
        <div ref={emblaRef} className="overflow-hidden pb-4">
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
        {/* {canScrollNext && ( */}
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={cn(btnBaseStyle, '-right-5')}
          aria-label="다음"
        >
          <ArrowRightIcon />
        </button>
        {/* )} */}
      </div>
    </section>
  );
}
