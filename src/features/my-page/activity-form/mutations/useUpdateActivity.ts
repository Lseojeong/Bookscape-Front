import { useMutation } from '@tanstack/react-query';
import type {
  UpdateMyActivityRequestBody,
  UpdateMyActivityResponse,
} from '@/features/my-page/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const useUpdateActivity = (id: number) => {
  return useMutation({
    mutationFn: async (data: UpdateMyActivityRequestBody) => {
      const res = await bffFetch.patch<UpdateMyActivityResponse>(`/my-activities/${id}`, data);
      if (!res) throw new Error('체험 수정에 실패했습니다.');
      return res;
    },
  });
};
