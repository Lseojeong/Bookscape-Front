import Skeleton from '@/shared/ui/skeleton/Skeleton';

/** 예약 현황 페이지 패널의 탭바 스켈레톤 UI입니다. */
export default function ReservationTabBarSkeleton() {
  return (
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-6 flex-1 rounded-xl" />
      ))}
    </div>
  );
}
