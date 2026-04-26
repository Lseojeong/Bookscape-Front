'use client';

import { useToastStore } from '@/shared/stores/useToastStore';
import Toast from './Toast';

/**
 * 전역 토스트 목록을 화면 하단 중앙에 렌더링하는 컴포넌트입니다.
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-10 left-1/2 flex -translate-x-1/2 flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
