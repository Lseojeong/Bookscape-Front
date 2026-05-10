import SearchActivityList from '@/app/(public)/(explore)/(main)/ui/SearchActivityList';
import { ActivityData } from '@/features/activity/types';
import Pagination from '@/shared/ui/pagination/Pagination';

type ActivityListWithPaginationProps = {
  activities: ActivityData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

/**
 * 체험 목록과 페이지네이션을 함께 렌더링하는 컴포넌트입니다.
 *
 * @param activities - 렌더링할 체험 목록
 * @param currentPage - 현재 페이지 번호
 * @param totalPages - 전체 페이지 수
 * @param onPageChange - 페이지 변경 핸들러
 */
export default function ActivityListWithPagination({
  activities,
  currentPage,
  totalPages,
  onPageChange,
}: ActivityListWithPaginationProps) {
  return (
    <>
      <SearchActivityList activities={activities} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
}
