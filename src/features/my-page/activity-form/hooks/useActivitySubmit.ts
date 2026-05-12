import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateActivity } from '@/features/my-page/activity-form/mutations/useCreateActivity';
import { useUploadImage } from '@/features/my-page/activity-form/mutations/useUploadImage';
import { getImageUrl, getImageUrls } from '@/features/my-page/activity-form/utils/images';
import { ActivityFormValues } from '@/features/my-page/activity-form/utils/schema';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';

export const useActivitySubmit = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync: createActivityAsync, isPending: isCreating } = useCreateActivity();

  const submitActivity = async (data: ActivityFormValues) => {
    try {
      setIsUploading(true);

      const bannerImageUrl = await getImageUrl(data.bannerImage, uploadImage);
      const subImageUrls = await getImageUrls(data.subImages || [], uploadImage);

      // 주소를 합칠 때 쉼표를 구분자로 사용
      const formattedAddress = data.detailAddress
        ? `${data.address}, ${data.detailAddress}`
        : data.address;

      // 최종 페이로드 가공
      const payload = {
        title: data.title,
        category: data.category,
        description: data.description,
        address: formattedAddress,
        price: data.price,
        bannerImageUrl: bannerImageUrl as string,
        subImageUrls,
        schedules: data.schedules.map((s) => ({
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        })),
      };

      // 등록 API가 완료될 때까지 기다림
      await createActivityAsync(payload);
      showToast('check', '체험이 성공적으로 등록되었습니다.');
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_ACTIVITIES() });
      router.push('/mypage/activity');
    } catch {
      showToast('cancel', '체험 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    submitActivity,
    isPending: isUploading || isCreating,
  };
};
