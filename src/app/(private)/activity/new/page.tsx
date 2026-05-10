'use client';

import { useState } from 'react';
import ActivityForm from '@/features/my-page/activity-form/ui/ActivityForm';
import { ActivityFormValues } from '@/features/my-page/activity-form/utils/schema';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

/**
 * 새로운 체험을 등록하는 페이지 컴포넌트입니다.
 *
 * @example
 * export default function Page() {
 * return <ActivityNewPage />;
 * }
 */
export default function ActivityNewPage() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const { showToast } = useToastStore();
  // NOTE: 폼을 초기화하기 위한 Key 상태
  const [formKey, setFormKey] = useState(0);

  const handleCreateActivity = (data: ActivityFormValues) => {
    // TODO: 린트 에러 방지용으로 API 연결 시 삭제 필요
    void data;
    showToast('check', '폼 검증에 성공하였습니다.');

    // TODO: 이후 백엔드 연동 시 React Query의 mutate 함수로 교체 필요
    // mutate(data);
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleConfirmReset = () => {
    setFormKey((prev) => prev + 1); // Key를 변경하여 폼을 리셋
    setIsCancelModalOpen(false);
    showToast('check', '내용이 초기화되었습니다.');
  };

  return (
    <main className="w-full pb-15.25 md:pb-9.25">
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14">
        <div className="mb-10">
          <PageHeader title="내 체험 등록" onBack={handleCancelClick} />
        </div>

        <ActivityForm
          key={formKey} // key를 부여하여 부모가 원할 때 자식을 새로 렌더링하게 함
          mode="create"
          onSubmitForm={handleCreateActivity}
          onCancelForm={handleCancelClick}
        />
      </div>

      <ConfirmDialog
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="입력 내용을 초기화하시겠어요?"
        description="작성 중인 모든 내용이 삭제되고 처음 상태로 돌아갑니다."
        cancelText="초기화하기"
        confirmText="계속 작성하기"
        onCancel={handleConfirmReset}
      />
    </main>
  );
}
