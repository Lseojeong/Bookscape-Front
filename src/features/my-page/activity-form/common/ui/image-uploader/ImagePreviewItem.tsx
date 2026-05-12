'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import DeleteButton from '@/features/my-page/activity-form/common/ui/image-uploader/DeleteButton';
import { cn } from '@/shared/utils/cn';

export type ImagePreviewItemProps = {
  img: File | string;
  isError: boolean;
  onRemove: () => void;
};

/**
 * 업로드된 이미지의 미리보기 및 삭제 기능을 제공하는 개별 아이템 컴포넌트입니다.
 * 내부적으로 URL.createObjectURL의 생명주기를 관리하여 메모리 누수를 방지합니다.
 *
 * @example
 * ```tsx
 * <ImagePreviewItem
 *   img={fileOrUrl}
 *   isError={false}
 *   onRemove={() => handleRemove(index)}
 * />
 * ```
 */
export default function ImagePreviewItem({ img, isError, onRemove }: ImagePreviewItemProps) {
  const [objectUrl, setObjectUrl] = useState<string>();

  useEffect(() => {
    // 이미지가 문자열(기존 URL)이면 무시
    if (typeof img === 'string') {
      return;
    }

    // File 객체일 때만 Object URL을 생성
    const url = URL.createObjectURL(img);

    queueMicrotask(() => {
      setObjectUrl(url);
    });

    // 컴포넌트 언마운트 시 메모리에서 해제
    return () => URL.revokeObjectURL(url);
  }, [img]);

  // 렌더링 시점에 이미지 소스를 결정
  const imgSrc = typeof img === 'string' ? img : objectUrl;

  if (!imgSrc) return null;

  return (
    <div className="relative h-20 w-20 md:h-32 md:w-32">
      <div
        className={cn(
          'relative h-full w-full overflow-hidden rounded-lg border md:rounded-2xl',
          isError ? 'border-error' : 'border-gray-100'
        )}
      >
        <Image
          src={imgSrc}
          alt="preview"
          fill
          className="object-cover"
          unoptimized={typeof img !== 'string'}
        />
      </div>

      <DeleteButton
        className="absolute -top-1 -right-1 layer-base"
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
      />
    </div>
  );
}
