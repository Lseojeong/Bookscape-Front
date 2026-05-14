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
    // 서버 단에서 레이아웃과 <h1> 태그를 먼저 렌더링
    <div className="w-full pb-15.25 md:pb-9.25">
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14">
        <div className="mb-10">
          <PageHeader title="내 체험 등록" />
        </div>
        <ActivityNewClient />
      </div>
    </div>
  );
}
