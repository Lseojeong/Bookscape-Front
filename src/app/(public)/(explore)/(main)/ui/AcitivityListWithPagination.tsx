import SearchActivityList from '@/app/(public)/(explore)/(main)/ui/SearchActivityList';
import { ActivityData } from '@/features/activity/types';
import Pagination from '@/shared/ui/pagination/Pagination';

type ActivityListWithPaginationProps = {
  activities: ActivityData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

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
