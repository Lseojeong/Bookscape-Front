import ReservationCardSkeleton from '@/features/my-page/reservation-status/ui/skeleton/ReservationCardSkeleton';
import ReservationDropdownSkeleton from '@/features/my-page/reservation-status/ui/skeleton/ReservationDropdownSkeleton';

/** 예약 현황 패널 컨텐츠 스켈레톤 UI입니다. */
export default function ReservationPanelContentSkeleton() {
  return (
    <>
      <div className="">
        <p className="mt-5 mb-3 typo-18-bold lg:mt-7.5">예약 시간</p>
        <div className="flex flex-col gap-3">
          <ReservationDropdownSkeleton />
        </div>
      </div>
      <div className="">
        <p className="mt-5 mb-3 typo-18-bold lg:mt-7.5">예약내역</p>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <ReservationCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
