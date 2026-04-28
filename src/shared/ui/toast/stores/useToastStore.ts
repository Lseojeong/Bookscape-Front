import { create } from 'zustand';
import type { ToastItem, ToastType } from '@/shared/ui/toast/types';

type ToastStore = {
  toasts: ToastItem[];
  showToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
};

/**
 * 토스트 상태를 전역으로 관리하는 Zustand 스토어입니다.
 *
 * 어디서든 showToast를 호출하여 토스트 알림을 띄울 수 있습니다.
 *
 * @param toasts - 현재 화면에 표시 중인 토스트 목록
 * @param showToast - 토스트를 추가하는 함수
 * @param removeToast - 토스트를 제거하는 함수
 *
 * @example
 * ```tsx
 * const { showToast } = useToastStore();
 *
 * // 성공
 * showToast('check', '작업이 성공적으로 완료했습니다.');
 *
 * // 에러
 * showToast('cancel', '작업 중 오류가 발생했습니다.');
 *
 * // 경고
 * showToast('warning', '작업 중 문제가 발생했습니다.');
 * ```
 */
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: (type, message) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
  },
}));
