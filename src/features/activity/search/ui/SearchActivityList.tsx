import Link from 'next/link';
import ActivityCard from '@/features/activity/main/ui/activity-card/ActivityCard';
import { ActivityData } from '@/features/activity/types';

type SearchActivityListProps = {
  activities: ActivityData[];
};

/**
 * 검색 결과 체험 목록을 그리드 형태로 렌더링하는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <SearchActivityList activities={activities} />
 * ```
 */
export default function SearchActivityList({ activities }: SearchActivityListProps) {
  return (
    <ul className="grid w-full grid-cols-2 gap-4.5 md:gap-5 lg:grid-cols-4 lg:gap-6">
      {activities.map((data) => {
        return (
          <li key={data.id}>
            <Link href={`/activity/${data.id}`}>
              <ActivityCard data={data} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
