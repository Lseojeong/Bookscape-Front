'use client';

import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';
import useOverlayStore from '@/shared/ui/overlay/stores/useOverlayStore';

/**
 * ## OverlayRoot
 *
 * 앱 전역에서 overlay를 렌더링하는 root 컴포넌트입니다.
 *
 * @remarks
 * - 앱 최상단 레이아웃에서 1회만 렌더링해 사용합니다.
 * - overlay store 상태를 구독하여 Portal 기반으로 화면 최상단에 표시합니다.
 * - ESC 처리와 body scroll lock은 내부 `OverlayLayer` 컴포넌트에서 관리합니다.
 *
 * @example
 * ```tsx
 * export default function RootLayout({ children }: { children: ReactNode }) {
 *   return (
 *     <body>
 *       {children}
 *       <OverlayRoot />
 *     </body>
 *   );
 * }
 * ```
 */
export default function OverlayRoot() {
  const isOpen = useOverlayStore((s) => s.isOpen);
  const content = useOverlayStore((s) => s.content);
  const ariaLabel = useOverlayStore((s) => s.ariaLabel);
  const closeOnOverlayClick = useOverlayStore((s) => s.closeOnOverlayClick);
  const closeOnEsc = useOverlayStore((s) => s.closeOnEsc);
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);

  return (
    <OverlayLayer
      isOpen={isOpen}
      onClose={closeOverlay}
      ariaLabel={ariaLabel}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
    >
      {content}
    </OverlayLayer>
  );
}
