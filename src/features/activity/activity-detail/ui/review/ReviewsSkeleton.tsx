import Skeleton from '@/shared/ui/skeleton/Skeleton';

/**
 * 체험 리뷰 섹션 로딩 스켈레톤 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ActivityReviewsSkeleton />
 * ```
 */
export default function ActivityReviewsSkeleton() {
  return (
    <>
      {/* ReviewSummary */}
      <div className="mb-6 flex flex-col items-center gap-0.5">
        <Skeleton className="h-8 w-12 rounded md:h-10" />
        <Skeleton className="h-4 w-16 rounded md:h-5" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>

      {/* ReviewCard 3개 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="mb-4 rounded-3xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 rounded md:h-5" />
              <Skeleton className="h-3 w-20 rounded md:h-4" />
            </div>
            <Skeleton className="h-4 w-20 rounded" />
          </div>
          <Skeleton className="h-4 w-full rounded md:h-5" />
        </div>
      ))}
    </>
  );
}
