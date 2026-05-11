'use client';
import ActivityListWithPagination from '@/app/(public)/(explore)/(main)/ui/ActivityListWithPagination';
import { useAllActivityList } from '@/features/activity/activities/hooks/useAllActivityList';
import EmptyState from '@/shared/ui/empty-state/EmptyState';

/**
 * 전체 체험 목록 섹션 컴포넌트입니다.
 * 체험이 없을 경우 빈 상태 안내 메시지를 표시하고,
 * 체험이 있을 경우 페이지네이션과 함께 목록을 렌더링합니다.
 */
export default function AllActivitiesSection() {
  const { page, activities, totalPages, handlePageChange, isLoading, isError, refetch } =
    useAllActivityList();

  // TODO: 스켈레톤으로 대체
  if (isLoading) {
    return;
  }

  if (isError) {
    return (
      <div className="mt-10">
        <EmptyState
          type="error"
          mainText={'문제가 발생했어요.\n잠시 후 다시 시도해주세요.'}
          onRetry={refetch}
        />
      </div>
    );
  }
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
        <section className="flex flex-col items-center gap-6 md:gap-7.5">
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
