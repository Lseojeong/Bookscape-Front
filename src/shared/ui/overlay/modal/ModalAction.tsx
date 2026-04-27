'use client';

import Modal from '@/shared/ui/overlay/modal/Modal';
import useModalStore from '@/shared/ui/overlay/stores/useModalStore';

/**
 * ModalAction
 *
 * Zustand store 상태를 구독해 전역 모달을 렌더링하는 Action 컴포넌트입니다.
 *
 * @remarks
 * - 앱 최상단 레이아웃에서 1회만 렌더링해 사용합니다.
 */
const ModalAction = () => {
  const isOpen = useModalStore((s) => s.isOpen);
  const content = useModalStore((s) => s.content);
  const ariaLabel = useModalStore((s) => s.ariaLabel);
  const closeOnOverlayClick = useModalStore((s) => s.closeOnOverlayClick);
  const closeOnEsc = useModalStore((s) => s.closeOnEsc);
  const closeModal = useModalStore((s) => s.closeModal);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      ariaLabel={ariaLabel}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
    >
      {content}
    </Modal>
  );
};

export default ModalAction;
