import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateActivity } from '@/features/my-page/activity-form/mutations/useCreateActivity';
import { useUploadImage } from '@/features/my-page/activity-form/mutations/useUploadImage';
import { ActivityFormValues } from '@/features/my-page/activity-form/utils/schema';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

export const useActivitySubmit = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutate: createActivity, isPending: isCreating } = useCreateActivity();

  const submitActivity = async (data: ActivityFormValues) => {
    try {
      setIsUploading(true);

      // 배너 이미지 업로드 처리
      const bannerImageUrl =
        data.bannerImage instanceof File
          ? await uploadImage(data.bannerImage)
          : (data.bannerImage as string);

      // 소개 이미지 병렬 업로드 처리
      const subImageUrls = await Promise.all(
        (data.subImages || []).map(async (img) =>
          img instanceof File ? await uploadImage(img) : (img as string)
        )
      );

      // 최종 페이로드 가공
      const payload = {
        title: data.title,
        category: data.category,
        description: data.description,
        address: `${data.address} ${data.detailAddress}`.trim(),
        price: data.price!,
        bannerImageUrl,
        subImageUrls,
        schedules: data.schedules.map((s) => ({
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        })),
      };

      // 체험 등록 API 호출
      createActivity(payload, {
        onSuccess: () => {
          showToast('check', '체험이 성공적으로 등록되었습니다.');
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_ACTIVITIES() });
          router.push('/mypage/activity');
        },
        onError: () => {
          showToast('cancel', '체험 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
      });
    } catch {
      showToast('cancel', '이미지 업로드 중 문제가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    submitActivity,
    isPending: isUploading || isCreating,
  };
};
