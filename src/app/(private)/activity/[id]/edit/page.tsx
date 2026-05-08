'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ActivityForm, {
  type ActivityInitialData,
} from '@/features/my-page/activity-form/ui/ActivityForm';
import { ActivityFormValues } from '@/features/my-page/activity-form/utils/schema';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
import PageHeader from '@/shared/ui/page-header/PageHeader';

/**
 * 등록된 내 체험을 수정하는 페이지 컴포넌트입니다.
 *
 * @example
 * export default function Page() {
 * return <ActivityEditPage />;
 * }
 */
export default function ActivityEditPage() {
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // TODO: React Query의 useQuery를 사용하여 activityId로 기존 체험 상세 정보를 불러와야 함

  // INFO: API 연동 전 UI 테스트를 위해 만든 임시 초기 데이터
  const mockInitialData: ActivityInitialData = {
    title: '함께 배우면 즐거운 스트릿댄스',
    category: '투어',
    description: '둠칫 둠칫 두둠칫',
    price: 10000,
    address: '서울특별시 강남구 테헤란로 427',
    detailAddress: '',
    bannerImage:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
    subImages: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png',
    ],
    schedules: [{ date: '2023-12-01', startTime: '12:00', endTime: '13:00' }],
  };

  // TODO: 수정 API 훅 연결 필요

  const handleUpdateActivity = (data: ActivityFormValues) => {
    console.log('🚀 [서버로 전송하기 전 폼 원본 데이터]:', data);
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleConfirmLeave = () => {
    router.back();
  };

  return (
    <main className="w-full pb-15.25 md:pb-9.25">
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14">
        <div className="mb-10">
          <PageHeader title="내 체험 수정" onBack={() => router.back()} />
        </div>

        <ActivityForm
          mode="edit"
          initialData={mockInitialData}
          onSubmitForm={handleUpdateActivity}
          onCancelForm={handleCancelClick}
        />
      </div>

      <ConfirmDialog
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="아직 내용이 저장되지 않았어요."
        description="뒤로 가면 입력한 내용이 사라집니다."
        cancelText="나가기"
        confirmText="계속 작성하기"
        onCancel={handleConfirmLeave}
      />
    </main>
  );
}
