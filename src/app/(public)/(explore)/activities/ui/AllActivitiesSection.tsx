'use client';
import ActivityListWithPagination from '@/app/(public)/(explore)/(main)/ui/AcitivityListWithPagination';
import { useAllActivityList } from '@/features/activity/activities/hooks/useAllActivityList';

export default function AllActivitiesSection() {
  const { page, activities, totalPages, handlePageChange } = useAllActivityList();

  return (
    <section className="mt-6 flex flex-col items-center gap-6 md:gap-7.5">
      <ActivityListWithPagination
        activities={activities}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
