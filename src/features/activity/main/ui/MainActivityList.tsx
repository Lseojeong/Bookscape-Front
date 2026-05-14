'use client';
import Link from 'next/link';
import ActivityCardSkeleton from '@/features/activity/common/ui/skeleton/ActivityCardSkeleton';
import useMainActivityCarousel from '@/features/activity/main/hooks/useMainActivityCarousel';
import ActivityCard from '@/features/activity/main/ui/activity-card/ActivityCard';
import CarouselArrowButton from '@/features/activity/main/ui/CarouselArrowButton';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets/icons';
import useDelayedLoading from '@/shared/hooks/useDelayedLoading';
import EmptyState from '@/shared/ui/empty-state/EmptyState';
import Title from '@/shared/ui/title/Title';
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
  const {
    emblaRef,
    activityData,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    isLoading,
    isError,
    refetch,
  } = useMainActivityCarousel();
  const isSkeletonVisible = useDelayedLoading(isLoading);

  return (
    <article className="flex w-full flex-col gap-5 py-8">
      <Title as="h2" size="18" weight="bold" className="text-gray-950 md:typo-32-bold">
        🔥 <span className="text-secondary-500">HOT</span> 인기 체험
      </Title>

      {isLoading && !isSkeletonVisible ? null : isSkeletonVisible ? (
        <>
          {/* 기본: 1개 반 노출, md: 2개 노출, lg: 8개 노출 */}
          <div className="flex gap-4 overflow-visible md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ActivityCardSkeleton
                key={i}
                className={cn(
                  'w-[calc(70%-6px)] shrink-0',
                  'md:w-auto md:shrink',
                  i >= 2 ? 'hidden lg:block' : ''
                )}
              />
            ))}
          </div>
        </>
      ) : isError ? (
        <div className="mt-10">
          <EmptyState
            type="error"
            mainText={'인기 체험을 불러오는 데 실패했어요.\n잠시 후 다시 시도해주세요.'}
            onRetry={refetch}
          />
        </div>
      ) : activityData.length === 0 ? (
        <EmptyState
          type="experience"
          mainText={'아직 인기 체험이 없어요.\n첫 번째 후기의 주인공이 되어보시는 건 어떨까요?'}
        />
      ) : (
        <div className="group relative">
          {/* 왼쪽 버튼 */}
          <CarouselArrowButton
            className="-left-5"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            ariaLabel="이전"
          >
            <ArrowLeftIcon />
          </CarouselArrowButton>

          {/* 이미지 캐러셀 */}
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
          <CarouselArrowButton
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="-right-5"
            ariaLabel="다음"
          >
            <ArrowRightIcon />
          </CarouselArrowButton>
        </div>
      )}
    </article>
  );
}
