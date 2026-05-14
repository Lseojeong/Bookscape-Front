import MyActivityCreateButton from '@/features/my-page/my-activity/ui/MyActivityCreateButton';
import MyActivityList from '@/features/my-page/my-activity/ui/MyActivityList';
import PageHeader from '@/shared/ui/page-header/PageHeader';

export default function MyActivityPage() {
  return (
    <div className="mypage-content">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <PageHeader
          title="내 체험 관리"
          description="체험을 등록하거나 수정 및 삭제가 가능합니다."
        />
        <MyActivityCreateButton />
      </div>

      <MyActivityList />
    </div>
  );
}
