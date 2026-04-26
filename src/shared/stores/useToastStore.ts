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
 * @param toasts - 현재 화면에 표시 중인 토스트 목록
 * @param showToast - 토스트를 추가하는 함수
 * @param removeToast - 토스트를 제거하는 함수
 */
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: (type, message) => {
    const id = crypto.randomUUID(); // 토스트마다 id 생성
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] })); // 기존 토스트에 새 토스트 추가
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })); // 토스트 제거
  },
}));
