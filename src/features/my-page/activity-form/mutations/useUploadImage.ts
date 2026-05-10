import { useMutation } from '@tanstack/react-query';
import type { CreateActivityImageUrlResponse } from '@/features/activity/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      const res = await bffFetch.postFormData<CreateActivityImageUrlResponse>(
        '/activities/image',
        formData
      );

      if (!res) {
        throw new Error('이미지 업로드 응답이 없습니다.');
      }

      return res.activityImageUrl;
    },
  });
};
