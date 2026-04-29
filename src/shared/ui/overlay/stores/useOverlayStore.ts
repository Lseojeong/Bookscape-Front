'use client';

import type { ReactNode } from 'react';
import { create } from 'zustand';

export type OpenOverlayParams = {
  content: ReactNode;
  ariaLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
};

type OverlayStoreState = {
  isOpen: boolean;
  content: ReactNode | null;
  ariaLabel?: string;
  closeOnOverlayClick: boolean;
  closeOnEsc: boolean;
  openOverlay: (params: OpenOverlayParams) => void;
  closeOverlay: () => void;
};

const DEFAULT_OPTIONS = {
  closeOnOverlayClick: true,
  closeOnEsc: true,
} as const;

/**
 * ## useOverlayStore
 *
 * 전역 overlay의 열림 상태와 렌더링할 콘텐츠를 관리하는 Zustand store입니다.
 *
 * @remarks
 * - `OverlayRoot`를 앱 최상단에 한 번 렌더링한 뒤 사용합니다.
 * - `openOverlay`에 전달한 `content`가 전역 overlay 내부에 렌더링됩니다.
 *
 * @example
 * ```tsx
 * const openOverlay = useOverlayStore((s) => s.openOverlay);
 *
 * openOverlay({
 *   ariaLabel: '예약 취소 확인',
 *   content: <ConfirmDialogContent />,
 *   closeOnEsc: true,
 * });
 * ```
 */
const useOverlayStore = create<OverlayStoreState>((set) => ({
  isOpen: false,
  content: null,
  ariaLabel: undefined,
  closeOnOverlayClick: DEFAULT_OPTIONS.closeOnOverlayClick,
  closeOnEsc: DEFAULT_OPTIONS.closeOnEsc,

  openOverlay: ({ content, ariaLabel, closeOnOverlayClick, closeOnEsc }) =>
    set({
      isOpen: true,
      content,
      ariaLabel,
      closeOnOverlayClick: closeOnOverlayClick ?? DEFAULT_OPTIONS.closeOnOverlayClick,
      closeOnEsc: closeOnEsc ?? DEFAULT_OPTIONS.closeOnEsc,
    }),

  closeOverlay: () =>
    set({
      isOpen: false,
      content: null,
      ariaLabel: undefined,
      closeOnOverlayClick: DEFAULT_OPTIONS.closeOnOverlayClick,
      closeOnEsc: DEFAULT_OPTIONS.closeOnEsc,
    }),
}));

export default useOverlayStore;
