import Skeleton from '@/shared/ui/skeleton/Skeleton';
import { cn } from '@/shared/utils/cn';

/** 세로형 체험 카드 스켈레톤 UI입니다.
 *
 * @example
 * ```tsx
 * {Array.from({ length: 8 }).map((_, i) => (
 *   <ActivityCardSkeleton key={i} />
 * ))}
 */
export default function ActivityCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-gray-100 p-4', className)}>
      {/* 이미지 영역 */}
      <Skeleton className="h-16 w-full rounded-xl md:h-34" />
      <div className="mt-3 mb-4 flex w-full flex-col gap-2 md:mt-3 md:mb-5">
        {/* 제목 */}
        <Skeleton className="h-4 w-4/5 rounded-xl md:h-5 md:w-2/3" />
        {/* 리뷰 */}
        <Skeleton className="h-4 w-16 rounded-xl md:h-5 md:w-1/4" />
      </div>
      {/* 가격 */}
      <Skeleton className="h-4 w-20 rounded-xl md:h-5 md:w-2/5" />
    </div>
  );
}
