import Skeleton from '@/shared/ui/skeleton/Skeleton';

export default function ActivityDetailLoading() {
  return (
    <div className="mx-auto max-w-280 px-6 pt-7.5 pb-30 md:px-7.5 md:pt-8.5 lg:flex lg:gap-10 lg:px-10 lg:pt-22">
      <section className="lg:w-167.5">
        {/* 이미지 캐러셀 */}
        <Skeleton className="h-61.25 w-full rounded-3xl md:h-100" />

        {/* ActivityInfo */}
        <div className="mt-7">
          {/* 카테고리 */}
          <Skeleton className="mb-2 h-4.5 w-20 rounded md:mb-2.5" />
          {/* 제목 */}
          <Skeleton className="mb-4 h-6.5 w-2/3 rounded md:h-9" />
          {/* 별점 */}
          <Skeleton className="mb-2.5 h-6 w-28 rounded" />
          {/* 주소 */}
          <Skeleton className="h-5 w-48 rounded" />
        </div>
        {/* 탭바 */}
        <div className="mt-7">
          <Skeleton className="h-10 w-full rounded" />
          {/* 본문 */}
          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>
        </div>
      </section>

      {/* 예약 위젯 (PC) */}
      <aside className="hidden lg:block lg:w-102.5">
        <Skeleton className="h-180 w-full rounded-3xl" />
      </aside>
    </div>
  );
}
