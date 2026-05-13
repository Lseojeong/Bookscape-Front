import MyActivityCreateButton from '@/features/my-page/my-activity/ui/MyActivityCreateButton';
import MyActivityList from '@/features/my-page/my-activity/ui/MyActivityList';
import MyActivityPageHeader from '@/features/my-page/my-activity/ui/MyActivityPageHeader';

export default function MyActivityPage() {
  return (
    <div className="mb-10 flex w-full flex-col gap-4 md:w-119 md:gap-7.5 lg:w-160">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <MyActivityPageHeader />
        <MyActivityCreateButton />
      </div>

      <MyActivityList />
    </div>
  );
}
