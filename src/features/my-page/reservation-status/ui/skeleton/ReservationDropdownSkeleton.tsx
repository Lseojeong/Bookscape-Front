import Skeleton from '@/shared/ui/skeleton/Skeleton';

/** 예약 현황 페이지 패널의 예약 시간 드롭다운 스켈레톤 UI입니다. */
export default function ReservationDropdownSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <Skeleton className="h-6 w-40 rounded-xl sm:w-50" />
    </div>
  );
}
