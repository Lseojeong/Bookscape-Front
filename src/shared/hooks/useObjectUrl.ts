import { useEffect, useState } from 'react';

/**
 * File 객체를 받아 브라우저 메모리 URL로 변환하고,
 * 컴포넌트 언마운트 시 자동으로 메모리를 해제해주는 훅입니다.
 *
 * @example
 * ```tsx
 * const objectUrl = useObjectUrl(file);
 * ```
 */
export default function useObjectUrl(file: File | null | undefined) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      queueMicrotask(() => {
        setObjectUrl(null);
      });
      return;
    }

    const url = URL.createObjectURL(file);

    queueMicrotask(() => {
      setObjectUrl(url);
    });

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return objectUrl;
}
