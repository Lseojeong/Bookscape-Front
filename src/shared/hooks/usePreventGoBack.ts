import { useEffect, useRef } from 'react';

export const usePreventGoBack = (onPrevent: () => void) => {
  // 최신 상태의 콜백을 유지하기 위한 무한 렌더링 방지용 Ref
  const callbackRef = useRef(onPrevent);

  useEffect(() => {
    callbackRef.current = onPrevent;
  }, [onPrevent]);

  useEffect(() => {
    // 마운트 시점에 트랩 설치
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      // 뒤로 가기가 감지되면 부모가 전달한 함수 실행
      callbackRef.current();
      // 트랩을 다시 쳐서 나가는 것을 막음
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 진짜로 나갈 때 호출할 함수
  const confirmLeave = () => {
    window.history.go(-2);
  };

  return { confirmLeave };
};
