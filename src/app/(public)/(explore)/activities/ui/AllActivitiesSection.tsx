'use client';
import ActivityListWithPagination from '@/app/(public)/(explore)/(main)/ui/AcitivityListWithPagination';
import { useAllActivityList } from '@/features/activity/activities/hooks/useAllActivityList';

export default function AllActivitiesSection() {
  const { page, activities, totalPages, handlePageChange } = useAllActivityList();

  return (
    <>
      <ActivityListWithPagination
        activities={activities}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
