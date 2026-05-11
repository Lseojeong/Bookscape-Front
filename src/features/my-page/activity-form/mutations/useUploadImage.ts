import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/features/my-page/apis';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      const res = await uploadImage(formData);

      if (!res) {
        throw new Error('이미지 업로드 응답이 없습니다.');
      }

      return res.activityImageUrl;
    },
  });
};
