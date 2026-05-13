import Skeleton from '@/shared/ui/skeleton/Skeleton';

/** 예약 현황 페이지 패널의 예약 내역 카드 스켈레톤 UI입니다. */
export default function ReservationCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <div className="flex w-full flex-col gap-3">
        {/* 텍스트 영역 */}
        <div className="space-y-2">
          {/* 닉네임 라인 */}
          <div className="flex items-center gap-2">
            {/* 라벨 영역 */}
            <Skeleton className="h-6 w-12 rounded-xl" />
            {/* 값 영역 */}
            <Skeleton className="h-6 w-30 rounded-xl" />
          </div>

          {/* 인원 라인 */}
          <div className="flex items-center gap-2">
            {/* 라벨 영역 */}
            <Skeleton className="h-6 w-12 rounded-xl" />
            {/* 값 영역 */}
            <Skeleton className="h-6 w-36 rounded-xl" />
          </div>
        </div>

        {/* 아래 배지 */}
        <div className="mt-2 flex gap-4">
          <Skeleton className="h-9 w-full rounded-xl" />
          <Skeleton className="h-9 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
