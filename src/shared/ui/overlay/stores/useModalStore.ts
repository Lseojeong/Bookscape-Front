'use client';

import type { ReactNode } from 'react';
import { create } from 'zustand';

export type OpenModalParams = {
  content: ReactNode;
  ariaLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
};

type ModalStoreState = {
  isOpen: boolean;
  content: ReactNode | null;
  ariaLabel?: string;
  closeOnOverlayClick: boolean;
  closeOnEsc: boolean;
  openModal: (params: OpenModalParams) => void;
  closeModal: () => void;
};

const DEFAULT_OPTIONS = {
  closeOnOverlayClick: true,
  closeOnEsc: true,
} as const;

const useModalStore = create<ModalStoreState>((set) => ({
  isOpen: false,
  content: null,
  ariaLabel: undefined,
  closeOnOverlayClick: DEFAULT_OPTIONS.closeOnOverlayClick,
  closeOnEsc: DEFAULT_OPTIONS.closeOnEsc,

  openModal: ({ content, ariaLabel, closeOnOverlayClick, closeOnEsc }) =>
    set({
      isOpen: true,
      content,
      ariaLabel,
      closeOnOverlayClick: closeOnOverlayClick ?? DEFAULT_OPTIONS.closeOnOverlayClick,
      closeOnEsc: closeOnEsc ?? DEFAULT_OPTIONS.closeOnEsc,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      content: null,
      ariaLabel: undefined,
      closeOnOverlayClick: DEFAULT_OPTIONS.closeOnOverlayClick,
      closeOnEsc: DEFAULT_OPTIONS.closeOnEsc,
    }),
}));

export default useModalStore;
