'use client';
import { useRouter } from 'next/navigation';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import SearchInput from '@/shared/ui/search-input/SearchInput';

export default function ActivitiesPageHeader() {
  const router = useRouter();
  return (
    <div className="flex">
      <div className="grow">
        <PageHeader
          title="체험활동"
          description="체험을 탐색하고 예약할 수 있습니다."
          onBack={() => router.back()}
        />
      </div>
      <div className="">
        <SearchInput className="h-14! w-full px-4! typo-14-medium! shadow-none sm:min-w-79.25" />
      </div>
    </div>
  );
}
