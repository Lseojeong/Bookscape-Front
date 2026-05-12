'use client';

import { useActivitySubmit } from '@/features/my-page/activity-form/hooks/useActivitySubmit';
import ActivityFormPageShell from '@/features/my-page/activity-form/ui/ActivityFormPageShell';

/**
 * 새로운 체험을 등록하는 페이지 컴포넌트입니다.
 */
export default function ActivityNewPage() {
  const { submitActivity, isPending } = useActivitySubmit();

  return (
    <ActivityFormPageShell
      title="내 체험 등록"
      mode="create"
      onSubmitForm={submitActivity}
      isPending={isPending}
      resetToastMessage="내용이 초기화되었습니다."
      confirmText="계속 작성하기"
    />
  );
}
