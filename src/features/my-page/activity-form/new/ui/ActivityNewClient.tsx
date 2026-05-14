'use client';

import ActivityFormPageShell from '@/features/my-page/activity-form/common/ui/ActivityFormPageShell';
import { useActivitySubmit } from '@/features/my-page/activity-form/new/hooks/useActivitySubmit';

/**
 * 새로운 체험을 등록하는 컴포넌트입니다.
 */
export default function ActivityNewClient() {
  const { submitActivity, isPending } = useActivitySubmit();

  return (
    <ActivityFormPageShell
      mode="create"
      onSubmitForm={submitActivity}
      isPending={isPending}
      resetToastMessage="내용이 초기화되었습니다."
      confirmText="계속 작성하기"
    />
  );
}
