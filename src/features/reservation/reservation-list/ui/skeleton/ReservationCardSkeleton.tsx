'use client';

import BaseCardInfo from '@/shared/ui/card/base/BaseCardInfo';
import { cardInfoStyles, cardImageStyles, cardWrapStyles } from '@/shared/ui/card/cardStyles';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import { cn } from '@/shared/utils/cn';

/**
 * 예약 내역 카드 로딩 시 표시되는 스켈레톤 컴포넌트입니다.
 *
 * @example
 * <ReservationCardSkeleton />
 */
export default function ReservationCardSkeleton() {
  return (
    <div className={cn('flex items-center rounded-3xl', cardWrapStyles)}>
      {/* 이미지 영역 */}
      <Skeleton className={cn(cardImageStyles, 'inset-y-0')} />

      {/* 정보 영역 */}
      <div className="relative layer-base w-full">
        <BaseCardInfo className={cn(cardInfoStyles)}>
          <Skeleton className="h-6 w-16 rounded-full" />

          <div className="mt-2 mb-2 flex flex-col gap-1 lg:mt-3 lg:mb-1.5 lg:gap-2">
            <Skeleton className="h-5 w-3/5 rounded-md" />
            <Skeleton className="h-4 w-2/5 rounded-md" />
          </div>

          <div className="flex flex-col justify-between gap-3 lg:flex-row">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 w-20 rounded-md" />
              <Skeleton className="h-10 w-20 rounded-md" />
            </div>
          </div>
        </BaseCardInfo>
      </div>
    </div>
  );
}
