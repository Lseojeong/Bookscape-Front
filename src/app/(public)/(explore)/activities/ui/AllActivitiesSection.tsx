'use client';
import ActivityListWithPagination from '@/app/(public)/(explore)/(main)/ui/AcitivityListWithPagination';
import { useAllActivityList } from '@/features/activity/activities/hooks/useAllActivityList';
import EmptyState from '@/shared/ui/empty-state/EmptyState';

export default function AllActivitiesSection() {
  const { page, activities, totalPages, handlePageChange } = useAllActivityList();

  return (
    <>
      {activities.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            type="experience"
            mainText={'선택한 필터에 맞는 체험이 없어요.\n다른 조건으로 다시 확인해보세요!'}
          />
        </div>
      ) : (
        <section className="mt-6 flex flex-col items-center gap-6 md:gap-7.5">
          <ActivityListWithPagination
            activities={activities}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      )}
    </>
  );
}
