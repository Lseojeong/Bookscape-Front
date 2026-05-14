import BaseCardInfo from '@/shared/ui/card/base/BaseCardInfo';
import { cardWrapStyles } from '@/shared/ui/card/cardStyles';
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
    <div className={cn(cardWrapStyles, className)}>
      <Skeleton className="mb-16.5 h-44 w-full rounded-xl md:mb-19 md:h-93.5 lg:h-72.5" />
      <BaseCardInfo className="absolute bottom-0 p-4 md:px-7.5 md:py-5">
        <div className="flex flex-col gap-2.5 md:gap-4.5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-4/5 rounded-xl md:h-5 md:w-2/3 lg:w-40" />
            <Skeleton className="h-4 w-16 rounded-xl md:h-5 md:w-1/4" />
          </div>
          <Skeleton className="h-4 w-20 rounded-xl md:h-5 md:w-2/5" />
        </div>
      </BaseCardInfo>
    </div>
  );
}
