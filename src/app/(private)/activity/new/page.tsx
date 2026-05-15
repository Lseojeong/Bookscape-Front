import ActivityNewClient from '@/features/my-page/activity-form/new/ui/ActivityNewClient';
import PageHeader from '@/shared/ui/page-header/PageHeader';

/**
 * 새로운 체험을 등록하는 페이지 서버 컴포넌트입니다.
 *
 * @example
 * <ActivityNewClient />
 */
export default function ActivityNewPage() {
  return (
    <>
      <div className="mb-10">
        <PageHeader title="내 체험 등록" />
      </div>

      <ActivityNewClient />
    </>
  );
}
