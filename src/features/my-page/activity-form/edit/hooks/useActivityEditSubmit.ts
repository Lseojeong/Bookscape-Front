import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUploadImage } from '@/features/my-page/activity-form/common/mutations/useUploadImage';
import { getImageUrl, getImageUrls } from '@/features/my-page/activity-form/common/utils/images';
import type { ActivityFormValues } from '@/features/my-page/activity-form/common/utils/schema';
import { useUpdateActivity } from '@/features/my-page/activity-form/edit/mutations/useUpdateActivity';
import type { ActivityDetailForForm } from '@/features/my-page/activity-form/types';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

export const useActivityEditSubmit = (activityId: number, originalData?: ActivityDetailForForm) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync: updateActivityAsync, isPending: isUpdating } = useUpdateActivity(activityId);

  const submitActivityEdit = async (formData: ActivityFormValues) => {
    if (!originalData) return;

    try {
      setIsUploading(true);

      // 배너 이미지 처리
      const bannerImageUrl = await getImageUrl(formData.bannerImage, uploadImage);

      // 소개 이미지 Diffing
      const formStringUrls = (formData.subImages || []).filter((img) => typeof img === 'string');
      const formFiles = (formData.subImages || []).filter((img) => img instanceof File);

      const subImageIdsToRemove = (originalData.subImages || [])
        .filter((orig) => !formStringUrls.includes(orig.imageUrl))
        .map((orig) => orig.id);

      const subImageUrlsToAdd = await getImageUrls(formFiles, uploadImage);

      // 스케줄 Diffing
      const originalFlatSchedules = originalData.schedules || [];

      const scheduleIdsToRemove: number[] = [];
      const schedulesToAdd: Array<{ date: string; startTime: string; endTime: string }> = [];

      // 폼에 있는 스케줄들을 하나씩 검사
      formData.schedules.forEach((formItem) => {
        if (!formItem.id) {
          // ID가 없으면 완전히 새로 추가된 스케줄
          schedulesToAdd.push({
            date: formItem.date,
            startTime: formItem.startTime,
            endTime: formItem.endTime,
          });
        } else {
          // ID가 있으면 기존 스케줄이므로 내용이 바뀌었는지 확인
          const orig = originalFlatSchedules.find((o) => o.id === formItem.id);
          if (orig) {
            const isChanged =
              orig.date !== formItem.date ||
              orig.startTime !== formItem.startTime ||
              orig.endTime !== formItem.endTime;

            if (isChanged) {
              // 날짜/시간이 바뀌었다면 기존 것은 삭제하고, 변경된 것을 새로 추가
              scheduleIdsToRemove.push(orig.id);
              schedulesToAdd.push({
                date: formItem.date,
                startTime: formItem.startTime,
                endTime: formItem.endTime,
              });
            }
          }
        }
      });

      // 아예 삭제 눌러서 폼에서 사라진 스케줄 찾기
      originalFlatSchedules.forEach((orig) => {
        const isStillInForm = formData.schedules.some((formItem) => formItem.id === orig.id);
        // 폼에도 없고, 수정돼서 삭제 목록에 아직 안 들어갔다면 완전 삭제된 것
        if (!isStillInForm && !scheduleIdsToRemove.includes(orig.id)) {
          scheduleIdsToRemove.push(orig.id);
        }
      });

      const formattedAddress = formData.detailAddress
        ? `${formData.address}, ${formData.detailAddress}`
        : formData.address;

      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        address: formattedAddress.trim(),
        bannerImageUrl: bannerImageUrl as string,
        subImageIdsToRemove,
        subImageUrlsToAdd,
        scheduleIdsToRemove,
        schedulesToAdd,
      };

      await updateActivityAsync(payload);

      showToast('check', '체험 수정이 완료되었습니다.');
      // 캐시 무효화를 통해 최신 데이터 갱신 보장
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACTIVITY_DETAIL(activityId) });
      router.push(`/activity/${activityId}`);
    } catch {
      showToast('cancel', '체험 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    submitActivityEdit,
    isPending: isUploading || isUpdating,
  };
};
