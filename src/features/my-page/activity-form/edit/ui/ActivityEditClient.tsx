'use client';

import { notFound } from 'next/navigation';
import { useMemo } from 'react';
import ActivityFormPageShell from '@/features/my-page/activity-form/common/ui/ActivityFormPageShell';
import { splitAddress } from '@/features/my-page/activity-form/common/utils/address';
import type { ActivityFormValues } from '@/features/my-page/activity-form/common/utils/schema';
import { useActivityEditSubmit } from '@/features/my-page/activity-form/edit/hooks/useActivityEditSubmit';
import { useActivityDetail } from '@/features/my-page/activity-form/edit/queries/useActivityDetail';
import { useUserStore } from '@/shared/stores/userStore';
type ActivityEditClientProps = {
  activityId: number;
};

/**
 * 체험 수정을 위한 클라이언트 컴포넌트입니다.
 */
export default function ActivityEditClient({ activityId }: ActivityEditClientProps) {
  const user = useUserStore((state) => state.user);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  const { data: originalData } = useActivityDetail(activityId);
  const { submitActivityEdit, isPending } = useActivityEditSubmit(activityId, originalData);

  if (hasHydrated && originalData) {
    if (user?.id !== originalData.userId) {
      notFound();
    }
  }

  const initialData = useMemo(() => {
    if (!originalData) return undefined;

    const { address, detailAddress } = splitAddress(originalData.address);

    return {
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
  }, [originalData]);

  return (
    <ActivityFormPageShell
      title="내 체험 수정"
      mode="edit"
      initialData={initialData}
      onSubmitForm={submitActivityEdit}
      isPending={isPending}
      resetToastMessage="수정 전 상태로 초기화되었습니다."
      confirmText="계속 수정하기"
      mainClassName=""
      containerClassName="mx-auto w-full max-w-3xl px-4 pt-10 md:px-0 md:pt-14"
    />
  );
}
