'use client';

import Image from 'next/image';
import DeleteButton from '@/features/my-page/activity-form/common/ui/image-uploader/DeleteButton';
import useObjectUrl from '@/shared/hooks/useObjectUrl';
import { cn } from '@/shared/utils/cn';

export type ImagePreviewItemProps = {
  img: File | string;
  isError: boolean;
  onRemove: () => void;
};

/**
 * 업로드된 이미지의 미리보기 및 삭제 기능을 제공하는 개별 아이템 컴포넌트입니다.
 *
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
  // File 객체일 때만 훅에 전달하여 Object URL 생성 (문자열인 기존 URL은 무시)
  const file = typeof img !== 'string' ? img : null;
  const objectUrl = useObjectUrl(file);

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
