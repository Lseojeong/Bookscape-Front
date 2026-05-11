'use client';

import { useMemo, useState } from 'react';
import { useActivityEditSubmit } from '@/features/my-page/activity-form/hooks/useActivityEditSubmit';
import { useActivityDetail } from '@/features/my-page/activity-form/queries/useActivityDetail';
import ActivityForm, {
  type ActivityInitialData,
} from '@/features/my-page/activity-form/ui/ActivityForm';
import { ActivityFormValues } from '@/features/my-page/activity-form/utils/schema';
import { usePreventGoBack } from '@/shared/hooks/usePreventGoBack';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
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

    // 주소 분리 로직
    const fullAddress = originalData.address || '';
    // 첫 번째 쉼표의 위치를 찾음.
    const firstCommaIndex = fullAddress.indexOf(',');
    let displayAddress = fullAddress;
    let displayDetailAddress = '';

    if (firstCommaIndex !== -1) {
      // 첫 번째 쉼표 앞부분은 기본 주소
      displayAddress = fullAddress.substring(0, firstCommaIndex).trim();
      // 첫 번째 쉼표 뒷부분은 상세 주소
      displayDetailAddress = fullAddress.substring(firstCommaIndex + 1).trim();
    }

    return {
      title: originalData.title,
      category: originalData.category as ActivityFormValues['category'],
      description: originalData.description,
      price: originalData.price,
      address: displayAddress,
      detailAddress: displayDetailAddress,
      bannerImage: originalData.bannerImageUrl,
      subImages: originalData.subImages?.map((img) => img.imageUrl) || [],
      schedules:
        originalData.schedules?.flatMap(
          (s) =>
            s.times?.map((t) => ({
              id: t.id,
              date: s.date,
              startTime: t.startTime,
              endTime: t.endTime,
            })) || []
        ) || [],
    };
  }, [originalData]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14">
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

      {/* 뒤로가기 모달 */}
      <ConfirmDialog
        isOpen={modalType === 'leave'}
        onClose={() => setModalType(null)}
        title="아직 내용이 저장되지 않았어요."
        description="뒤로 가면 수정한 내용이 사라집니다."
        cancelText="나가기"
        confirmText="계속 수정하기"
        onCancel={handleConfirmLeave}
      />

      {/* 폼 초기화 모달 */}
      <ConfirmDialog
        isOpen={modalType === 'reset'}
        onClose={() => setModalType(null)}
        title="입력 내용을 초기화하시겠어요?"
        description="수정한 내용이 모두 삭제되고 처음 상태로 돌아갑니다."
        cancelText="초기화하기"
        confirmText="계속 수정하기"
        onCancel={handleConfirmReset}
      />
    </main>
  );
}
