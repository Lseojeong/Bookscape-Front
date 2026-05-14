'use client';

import { useState, useEffect } from 'react';
import ActivityForm, {
  type ActivityInitialData,
} from '@/features/my-page/activity-form/common/ui/ActivityForm';
import LeaveConfirmDialog from '@/features/my-page/activity-form/common/ui/LeaveConfirmDialog';
import ResetConfirmDialog from '@/features/my-page/activity-form/common/ui/ResetConfirmDialog';
import type { ActivityFormValues } from '@/features/my-page/activity-form/common/utils/schema';
import { usePreventGoBack } from '@/shared/hooks/usePreventGoBack';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

export type ActivityFormPageShellProps = {
  mode: 'create' | 'edit';
  initialData?: ActivityInitialData;
  onSubmitForm: (data: ActivityFormValues) => void;
  isPending?: boolean;
  isErrorData?: boolean;
  resetToastMessage: string;
  confirmText: string;
  mainClassName?: string;
  containerClassName?: string;
};

export default function ActivityFormPageShell({
  mode,
  initialData,
  onSubmitForm,
  isPending = false,
  isErrorData = false,
  resetToastMessage,
  confirmText,
  mainClassName = '', // 여백은 부모에서 잡을 거라 기본값 초기화
  containerClassName = 'w-full', // 가로폭만 다 차지하도록 설정
}: ActivityFormPageShellProps) {
  const { showToast } = useToastStore();

  const [modalType, setModalType] = useState<'leave' | 'reset' | null>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (isErrorData) {
      showToast('cancel', '정보를 불러오지 못했습니다. 다시 시도해 주세요.');
    }
  }, [isErrorData, showToast]);

  const { confirmLeave } = usePreventGoBack(() => {
    if (modalType !== 'leave') {
      setModalType('leave');
    }
  });

  const handleCancelClick = () => setModalType('reset');

  const handleConfirmLeave = () => {
    setModalType(null);
    confirmLeave();
  };

  const handleConfirmReset = () => {
    setFormKey((prev) => prev + 1);
    setModalType(null);
    showToast('check', resetToastMessage);
  };

  return (
    <div className={mainClassName}>
      <div className={containerClassName}>
        {/* 수정 모드일 때는 데이터가 있어야만 렌더링, 등록 모드는 항상 렌더링 */}
        {(mode === 'create' || initialData) && (
          <ActivityForm
            key={formKey}
            mode={mode}
            initialData={initialData}
            onSubmitForm={onSubmitForm}
            onCancelForm={handleCancelClick}
            isPending={isPending}
          />
        )}
      </div>

      <LeaveConfirmDialog
        isOpen={modalType === 'leave'}
        onClose={() => setModalType(null)}
        onConfirmLeave={handleConfirmLeave}
        confirmText={confirmText}
      />

      <ResetConfirmDialog
        isOpen={modalType === 'reset'}
        onClose={() => setModalType(null)}
        onConfirmReset={handleConfirmReset}
        confirmText={confirmText}
      />
    </div>
  );
}
