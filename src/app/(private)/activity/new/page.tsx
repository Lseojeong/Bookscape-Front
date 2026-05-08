'use client';

import { useRouter } from 'next/navigation';
import ActivityForm from '@/features/my-page/activity-form/ui/ActivityForm';
import { ActivityFormValues } from '@/features/my-page/activity-form/utils/schema';
import PageHeader from '@/shared/ui/page-header/PageHeader';

/**
 * 새로운 체험을 등록하는 페이지 컴포넌트입니다.
 *
 * @example
 * export default function Page() {
 * return <ActivityNewPage />;
 * }
 */
export default function ActivityNewPage() {
  const router = useRouter();

  const handleCreateActivity = (data: ActivityFormValues) => {
    // 제출된 데이터가 조드 스키마 검증을 통과한 형태인지 확인
    console.log('서버로 전송될 최종 데이터:', data);
    alert('폼 검증 성공! (개발자 도구 콘솔창을 확인)');

    // TODO: 이후 백엔드 연동 시 React Query의 mutate 함수로 교체 필요
    // mutate(data);
  };

  return (
    <main className="w-full pb-15.25 md:pb-9.25">
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14">
        <div className="mb-10">
          <PageHeader title="내 체험 등록" onBack={() => router.back()} />
        </div>

        <ActivityForm mode="create" onSubmitForm={handleCreateActivity} />
      </div>
    </main>
  );
}
