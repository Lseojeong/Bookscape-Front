'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { EditIcon } from '@/shared/assets/icons';
import { DefaultProfileImage } from '@/shared/assets/images';
import Button from '@/shared/ui/button/Button';

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
 * @param onFileChange - 파일 선택 시 호출되는 콜백 (TODO: API 연동 시 사용)
 * @param onReset - 기본 프로필로 변경 시 호출되는 콜백
 */
export default function ImageUploadBox({
  initialImageUrl,
  onFileChange,
  onReset,
}: ProfileImageUploadProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewImage = objectUrl ?? initialImageUrl;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const nextObjectUrl = URL.createObjectURL(file);
    setObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return nextObjectUrl;
    });

    onFileChange?.(file); // TODO: API 연동 시 여기서 업로드
    e.target.value = '';
  };

  const handleReset = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    onReset?.();
  };

  const isDefault = !previewImage;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 프로필 이미지 */}
      <div className="relative">
        <div className="relative h-30 w-30 overflow-hidden rounded-full bg-primary-100">
          {previewImage ? (
            objectUrl ? (
              // 로컬 미리보기 → img 태그
              <Image
                src={previewImage}
                alt="프로필 이미지 미리보기"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              // 서버 이미지 → next/image
              <Image src={previewImage} alt="프로필 이미지" fill className="object-cover" />
            )
          ) : (
            // 기본 이미지
            <div className="flex h-full w-full items-center justify-center">
              <DefaultProfileImage />
            </div>
          )}
        </div>

        {/* 편집 버튼 */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute right-0.5 bottom-1 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-600"
          aria-label="프로필 이미지 변경"
        >
          <EditIcon className="h-4 w-4" />
        </button>

        {/* 숨겨진 파일 input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* 기본 프로필로 변경 버튼 */}
      <Button
        theme="secondary"
        size="sm"
        onClick={handleReset}
        className="h-10.5 w-42.5"
        disabled={isDefault}
      >
        기본 프로필로 변경
      </Button>
    </div>
  );
}
