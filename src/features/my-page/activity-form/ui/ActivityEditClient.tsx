'use client';

import { useMemo, useState } from 'react';
import { useActivityEditSubmit } from '@/features/my-page/activity-form/hooks/useActivityEditSubmit';
import { useActivityDetail } from '@/features/my-page/activity-form/queries/useActivityDetail';
import ActivityForm, {
  type ActivityInitialData,
} from '@/features/my-page/activity-form/ui/ActivityForm';
import LeaveConfirmDialog from '@/features/my-page/activity-form/ui/LeaveConfirmDialog';
import ResetConfirmDialog from '@/features/my-page/activity-form/ui/ResetConfirmDialog';
import { splitAddress } from '@/features/my-page/activity-form/utils/address';
import { ActivityFormValues } from '@/features/my-page/activity-form/utils/schema';
import { usePreventGoBack } from '@/shared/hooks/usePreventGoBack';
import PageHeader from '@/shared/ui/page-header/PageHeader';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

type ActivityEditClientProps = {
  activityId: number;
};

/**
 * 체험 수정을 위한 클라이언트 컴포넌트입니다.
 * 서버로부터 프리페칭된 데이터를 기반으로 폼 초기값을 설정하고 수정을 진행합니다.
 *
 * @example
 * <ActivityEditClient activityId={123} />
 */
export default function ActivityEditClient({ activityId }: ActivityEditClientProps) {
  const { showToast } = useToastStore();

  // 모달 상태 관리 ('leave': 페이지 나가기, 'reset': 폼 초기화, null: 닫힘)
  const [modalType, setModalType] = useState<'leave' | 'reset' | null>(null);

  // 폼을 초기화하기 위한 Key 상태
  const [formKey, setFormKey] = useState(0);

  // 프리페칭된 데이터를 캐시에서 꺼냄
  const { data: originalData } = useActivityDetail(activityId);

  const { submitActivityEdit, isPending } = useActivityEditSubmit(activityId, originalData);

  // 브라우저 뒤로 가기 방지 로직
  const { confirmLeave } = usePreventGoBack(() => {
    if (modalType !== 'leave') {
      setModalType('leave');
    }
  });

  const handleHeaderBackClick = () => {
    setModalType('leave');
  };

  const handleCancelClick = () => {
    setModalType('reset');
  };

  const handleConfirmLeave = () => {
    setModalType(null);
    confirmLeave();
  };

  const handleConfirmReset = () => {
    setFormKey((prev) => prev + 1); // Key를 변경하여 폼을 원본 상태로 리셋
    setModalType(null);
    showToast('check', '수정 전 상태로 초기화되었습니다.');
  };

  const initialData: ActivityInitialData | undefined = useMemo(() => {
    if (!originalData) return undefined;

    const { address, detailAddress } = splitAddress(originalData.address);

    const result = {
      title: originalData.title,
      category: originalData.category as ActivityFormValues['category'],
      description: originalData.description,
      price: originalData.price,
      address,
      detailAddress,
      bannerImage: originalData.bannerImageUrl,
      subImages: originalData.subImages?.map((img) => img.imageUrl) || [],
      schedules:
        originalData.schedules?.map((s) => ({
          id: s.id,
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        })) || [],
    };
    return result;
  }, [originalData]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14">
      <div className="mb-10">
        <PageHeader title="내 체험 수정" onBack={handleHeaderBackClick} />
      </div>

      {initialData && (
        <ActivityForm
          key={formKey}
          mode="edit"
          initialData={initialData}
          onSubmitForm={submitActivityEdit}
          onCancelForm={handleCancelClick}
          isPending={isPending}
        />
      )}

      <LeaveConfirmDialog
        isOpen={modalType === 'leave'}
        onClose={() => setModalType(null)}
        onConfirmLeave={handleConfirmLeave}
        confirmText="계속 수정하기"
      />

      <ResetConfirmDialog
        isOpen={modalType === 'reset'}
        onClose={() => setModalType(null)}
        onConfirmReset={handleConfirmReset}
        confirmText="계속 수정하기"
      />
    </div>
  );
}
