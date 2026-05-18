'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { EditIcon } from '@/shared/assets/icons';
import { DefaultProfileImage } from '@/shared/assets/images';
import { IMAGE_RULES } from '@/shared/constants/file';
import useObjectUrl from '@/shared/hooks/useObjectUrl';
import Button from '@/shared/ui/button/Button';
import { convertHeicToJpeg, validateImageFile } from '@/shared/utils/file';

type ProfileImageUploadProps = {
  initialImageUrl?: string | null;
  onFileChange?: (file: File) => void;
  onReset?: () => void;
};
/**
 * 이미지 업로드 박스 컴포넌트 (UI)
 *
 * - 원형 프로필 이미지를 표시합니다.
 * - 편집 버튼 클릭 시 파일 선택창이 열립니다.
 * - 선택한 이미지는 objectUrl로 미리보기로 표시됩니다.
 * - "기본 프로필로 변경" 버튼으로 이미지를 초기화할 수 있습니다.
 *
 * @param initialImageUrl - 초기 프로필 이미지 URL
 * @param onFileChange - 파일 선택 시 호출되는 콜백
 * @param onReset - 기본 프로필로 변경 시 호출되는 콜백
 * @example
 * ```tsx
 * <ImageUploadBox
 *   initialImageUrl="https://example.com/profile.jpg"
 *   onFileChange={(file) => console.log(file)}
 *   onReset={() => console.log('reset')}
 * />
 * ```
 */
export default function ImageUploadBox({
  initialImageUrl,
  onFileChange,
  onReset,
}: ProfileImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(initialImageUrl ?? null);
  const objectUrl = useObjectUrl(file);
  const previewImage = objectUrl ?? currentImageUrl;
  const [isConverting, setIsConverting] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    try {
      let processedFile = selected;

      const isHeic =
        /\.(heic|heif)$/i.test(selected.name) ||
        ['image/heic', 'image/heif'].includes(selected.type);
      if (isHeic) {
        setIsConverting(true);
        try {
          processedFile = await convertHeicToJpeg(selected);
        } catch {
          setError('HEIC 이미지 변환에 실패했습니다. 다른 형식으로 업로드해 주세요.');
          return;
        } finally {
          setIsConverting(false);
        }
      }

      const validationError = validateImageFile(processedFile);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      setFile(processedFile);
      onFileChange?.(processedFile);
    } finally {
      e.target.value = '';
    }
  };

  const handleReset = () => {
    setFile(null);
    setCurrentImageUrl(null);
    setError(null);
    onReset?.();
  };

  const isDefault = !previewImage;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="relative h-30 w-30 overflow-hidden rounded-full bg-primary-100">
          {isConverting ? (
            <div className="flex h-full w-full items-center justify-center">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
            </div>
          ) : previewImage ? (
            <Image
              src={previewImage}
              alt={objectUrl ? '프로필 이미지 미리보기' : '프로필 이미지'}
              fill
              unoptimized={!!objectUrl}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <DefaultProfileImage />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute right-0.5 bottom-1 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-600"
          aria-label="프로필 이미지 변경"
        >
          <EditIcon className="h-4 w-4" />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={IMAGE_RULES.ACCEPTED_TYPES.join(',')}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      <Button
        theme="secondary"
        size="sm"
        onClick={handleReset}
        className="h-10.5 w-42.5"
        disabled={isDefault}
      >
        기본 프로필로 변경
      </Button>

      {error && (
        <p className="typo-14-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
