'use client';

import { useState } from 'react';
import { useActivitySubmit } from '@/features/my-page/activity-form/hooks/useActivitySubmit';
import ActivityForm from '@/features/my-page/activity-form/ui/ActivityForm';
import { usePreventGoBack } from '@/shared/hooks/usePreventGoBack';
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
  const { showToast } = useToastStore();

  // 어떤 모달을 띄울지 관리하는 상태 ('leave': 페이지 나가기, 'reset': 폼 초기화, null: 닫힘)
  const [modalType, setModalType] = useState<'leave' | 'reset' | null>(null);

  // 폼을 초기화하기 위한 Key 상태
  const [formKey, setFormKey] = useState(0);

  // 제출 로직 커스텀 훅
  const { submitActivity, isPending } = useActivitySubmit();

  const { confirmLeave } = usePreventGoBack(() => {
    // 뒤로 가기를 누르면 모달을 띄움
    if (modalType !== 'leave') {
      setModalType('leave');
    }
  });

  // 백버튼 클릭 시
  const handleHeaderBackClick = () => {
    setModalType('leave');
  };

  // 폼 하단의 취소하기 버튼 클릭 시
  const handleCancelClick = () => {
    setModalType('reset');
  };

  // 뒤로가기 모달에서 '나가기' 확정 시
  const handleConfirmLeave = () => {
    setModalType(null);
    confirmLeave();
  };

  // 초기화 모달에서 '초기화하기' 확정 시
  const handleConfirmReset = () => {
    setFormKey((prev) => prev + 1); // Key를 변경하여 폼을 리셋
    setModalType(null);
    showToast('check', '내용이 초기화되었습니다.');
  };

  return (
    <main className="w-full pb-15.25 md:pb-9.25">
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14">
        <div className="mb-10">
          <PageHeader title="내 체험 등록" onBack={handleHeaderBackClick} />
        </div>

        <ActivityForm
          key={formKey} // key를 부여하여 부모가 원할 때 자식을 새로 렌더링하게 함
          mode="create"
          onSubmitForm={submitActivity}
          onCancelForm={handleCancelClick}
          isPending={isPending}
        />
      </div>

      {/* 뒤로가기 모달 */}
      <ConfirmDialog
        isOpen={modalType === 'leave'}
        onClose={() => setModalType(null)}
        title="아직 내용이 저장되지 않았어요."
        description="뒤로 가면 입력한 내용이 사라집니다."
        cancelText="나가기"
        confirmText="계속 작성하기"
        onCancel={handleConfirmLeave}
      />

      {/* 폼 초기화 모달 */}
      <ConfirmDialog
        isOpen={modalType === 'reset'}
        onClose={() => setModalType(null)}
        title="입력 내용을 초기화하시겠어요?"
        description="작성 중인 모든 내용이 삭제되고 처음 상태로 돌아갑니다."
        cancelText="초기화하기"
        confirmText="계속 작성하기"
        onCancel={handleConfirmReset}
      />
    </main>
  );
}
