'use client';

import { useState } from 'react';
import ImagePreviewItem from '@/features/my-page/activity-form/common/ui/image-uploader/ImagePreviewItem';
import { PlusIcon } from '@/shared/assets/icons';
import { IMAGE_RULES } from '@/shared/constants/file';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import { useToastStore } from '@/shared/ui/toast/stores/useToastStore';
import { cn } from '@/shared/utils/cn';
import { validateImageFile, convertHeicToJpeg } from '@/shared/utils/file';

export type ImageUploaderProps = {
  label?: string;
  errorMessage?: string;
  images: (File | string)[];
  maxCount?: number;
  showCounter?: boolean;
  onAddFiles: (files: File[]) => void;
  onRemove: (index: number) => void;
};

// File 객체나 string URL로부터 고유한 문자열 생성
const getUniqueKey = (img: File | string) => {
  if (typeof img === 'string') return img;
  // 파일명, 크기, 마지막 수정 시간을 조합하여 고유한 키 생성
  return `${img.name}-${img.size}-${img.lastModified}`;
};

/**
 * 폼 내에서 이미지 업로드 및 프리뷰 기능을 제공하는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ImageUploader
 * label="배너 이미지 등록"
 * images={images}
 * maxCount={3}
 * showCounter={true}
 * errorMessage={errors.bannerImage?.message}
 * onAddFiles={handleAddFiles}
 * onRemove={handleImageRemove}
 * />
 * ```
 */
export default function ImageUploader({
  label,
  errorMessage,
  images = [],
  maxCount = 1,
  showCounter = false,
  onAddFiles,
  onRemove,
}: ImageUploaderProps) {
  // 컴포넌트 내부에서 즉시 유효성 검사 에러를 띄워줄 상태
  const [localError, setLocalError] = useState<string>('');
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const count = images.length;
  // 변환 중이거나 갯수가 다 차면 버튼 비활성화
  const isDisabled = count >= maxCount || isConverting;

  // 로컬 에러가 있으면 먼저 보여주고, 없으면 Zod 에러를 보여줌
  const displayError = localError || errorMessage;
  const isError = !!displayError;

  const { showToast } = useToastStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이벤트가 터지자마자 현재의 타겟을 변수에 묶어둠
    const target = e.target;
    const pickedFiles = Array.from(target.files ?? []);

    if (pickedFiles.length === 0) return;

    // 남은 슬롯만큼만 파일 자르기
    const remainingCount = Math.max(0, maxCount - count);
    const filesToProcess = pickedFiles.slice(0, remainingCount);

    if (filesToProcess.length === 0) {
      target.value = '';
      return;
    }

    setIsConverting(true);

    try {
      // Promise.all을 사용하여 다중 파일의 HEIC 변환 및 유효성 검사를 병렬 처리
      const processedResults = await Promise.all(
        filesToProcess.map(async (file) => {
          try {
            const convertedFile = await convertHeicToJpeg(file);
            const validationError = validateImageFile(convertedFile);

            if (validationError) {
              return { file: null, error: validationError };
            }
            return { file: convertedFile, error: null };
          } catch {
            return {
              file: null,
              error: '이미지 포맷 변환에 실패했습니다. 다른 이미지를 사용해주세요.',
            };
          }
        })
      );

      const validFiles = processedResults
        .filter((result) => result.file !== null)
        .map((result) => result.file as File);

      const firstError = processedResults.find((result) => result.error !== null)?.error;

      // 에러가 하나라도 발생했다면 첫 번째 에러 메시지를 표시
      if (firstError) {
        setLocalError(firstError);
        // 포맷 변환 실패 에러인 경우 Toast 알림도 함께 표시
        if (firstError.includes('변환에 실패')) {
          showToast('cancel', firstError);
        }
      } else {
        setLocalError('');
      }

      // 유효한 파일이 하나라도 있다면 onAddFiles 호출
      if (validFiles.length > 0) {
        onAddFiles(validFiles);
      }
    } finally {
      setIsConverting(false);
      target.value = ''; // 지연이 발생해도 미리 묶어둔 target 변수를 사용하여 초기화
    }
  };

  return (
    <FormField label={label} labelWeight="bold" errorMessage={displayError}>
      <div className="flex flex-wrap gap-3 md:gap-3.5">
        <label
          className={cn(
            'group relative flex h-20 w-20 flex-col items-center justify-center rounded-lg border transition-colors md:h-32 md:w-32 md:rounded-2xl',
            isError ? 'border-error' : 'border-gray-100',
            isDisabled ? 'cursor-not-allowed bg-gray-25' : 'cursor-pointer bg-white',
            'outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2'
          )}
        >
          <Button
            as="div"
            size="icon"
            theme="primary"
            disabled={isDisabled}
            className={cn(
              'pointer-events-none h-7 w-7 bg-primary-500 text-white md:h-10.5 md:w-10.5',
              'group-hover:bg-primary-600',
              'aria-disabled:bg-gray-50 aria-disabled:text-gray-500',
              isConverting && 'animate-pulse opacity-50'
            )}
          >
            <PlusIcon className="h-4 w-4 md:h-6 md:w-6" />
          </Button>

          {showCounter && (
            <div className="mt-0.5 typo-13-medium md:mt-2.5 md:typo-14-medium">
              {count === maxCount ? (
                <span className="text-gray-600">
                  {count}/{maxCount}
                </span>
              ) : (
                <>
                  <span className="text-primary-500">{count}</span>
                  <span className="text-gray-600">/{maxCount}</span>
                </>
              )}
            </div>
          )}

          <input
            type="file"
            className="sr-only"
            accept={IMAGE_RULES.ACCEPTED_TYPES.join(',')}
            multiple={maxCount > 1}
            disabled={isDisabled}
            onChange={handleFileChange}
          />
        </label>

        {images.map((img, idx) => (
          <ImagePreviewItem
            key={`${getUniqueKey(img)}-${idx}`} // 동일한 이미지도 겹치지 않도록 함
            img={img}
            isError={isError}
            onRemove={() => onRemove(idx)}
          />
        ))}
      </div>
    </FormField>
  );
}
