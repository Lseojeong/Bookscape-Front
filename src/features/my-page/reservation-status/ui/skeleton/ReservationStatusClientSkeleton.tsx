import Skeleton from '@/shared/ui/skeleton/Skeleton';

/** 예약 현황 페이지 드롭다운 및 달력 스켈레톤 UI입니다. */
export default function ReservationStatusClientSkeleton() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="w-full rounded-2xl border border-gray-100 p-4">
        <Skeleton className="h-6 w-3/4 rounded-xl md:w-70" />
      </div>

      <Skeleton className="h-80 w-full rounded-xl md:h-120" />
    </div>
  );
}
