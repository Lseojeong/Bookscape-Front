'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type OverlayPortalProps = {
  children: ReactNode;
  /** portal로 렌더링할 컨테이너 id (기본값: modal-root) */
  containerId?: string;
};

/**
 * OverlayPortal
 *
 * overlay 계층을 DOM 트리 바깥으로 렌더링하기 위한 Portal 컴포넌트입니다.
 *
 * @remarks
 * - 기본 컨테이너는 `#modal-root`입니다.
 * - 컨테이너가 없으면 `document.body` 하단에 자동 생성합니다. (Storybook 등)
 * - SSR 환경에서는 `document`가 없으므로 렌더링하지 않습니다.
 */
export default function OverlayPortal({
  children,
  containerId = 'modal-root',
}: OverlayPortalProps) {
  const [portalState] = useState(() => {
    if (typeof document === 'undefined') {
      return { container: null as HTMLElement | null, created: false };
    }

    const existing = document.getElementById(containerId);
    if (existing) {
      return { container: existing, created: false };
    }

    const el = document.createElement('div');
    el.id = containerId;
    document.body.appendChild(el);
    return { container: el, created: true };
  });

  useEffect(() => {
    return () => {
      if (!portalState.created) {
        return;
      }
      const el = portalState.container;
      if (el?.parentElement) {
        el.parentElement.removeChild(el);
      }
    };
  }, [portalState]);

  if (!portalState.container) {
    return null;
  }

  return createPortal(children, portalState.container);
}
