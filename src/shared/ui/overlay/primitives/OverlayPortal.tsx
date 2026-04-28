'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OVERLAY_ROOT_ID } from '@/shared/ui/overlay/constants';

type OverlayPortalProps = {
  children: ReactNode;
  /** portal로 렌더링할 컨테이너 id (기본값: overlay-root) */
  containerId?: string;
};

/**
 * OverlayPortal
 *
 * overlay 계층을 DOM 트리 바깥으로 렌더링하기 위한 Portal 컴포넌트입니다.
 *
 * @remarks
 * - 기본 컨테이너는 `#overlay-root`입니다.
 * - 컨테이너가 없으면 `document.body` 하단에 자동 생성합니다. (Storybook 등)
 *
 * @example
 * ```tsx
 * <OverlayPortal>
 *   <div role="presentation" className="fixed inset-0 layer-modal">
 *     <OverlayBackdrop onClick={handleClose} />
 *
 *     <OverlaySurface position="center" variant="dialog" tone="surface" elevation="card">
 *       <div className="p-30">Dialog Content</div>
 *     </OverlaySurface>
 *   </div>
 * </OverlayPortal>
 * ```
 */
export default function OverlayPortal({
  children,
  containerId = OVERLAY_ROOT_ID,
}: OverlayPortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const existing = document.getElementById(containerId);
    if (existing) {
      queueMicrotask(() => setContainer(existing));
      return undefined;
    }

    const el = document.createElement('div');
    el.id = containerId;
    document.body.appendChild(el);
    queueMicrotask(() => setContainer(el));

    return () => {
      el.parentElement?.removeChild(el);
    };
  }, [containerId]);

  if (!container) {
    return null;
  }

  return createPortal(children, container);
}
