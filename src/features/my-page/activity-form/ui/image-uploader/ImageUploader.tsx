'use client';

import ImagePreviewItem from '@/features/my-page/activity-form/ui/image-uploader/ImagePreviewItem';
import { PlusIcon } from '@/shared/assets/icons';
import { IMAGE_RULES } from '@/shared/constants/file';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import { cn } from '@/shared/utils/cn';

export type ImageUploaderProps = {
  label?: string;
  errorMessage?: string;
  images: (File | string)[];
  maxCount?: number;
  showCounter?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
 *   label="배너 이미지 등록"
 *   images={images}
 *   maxCount={3}
 *   showCounter={true}
 *   errorMessage={errors.bannerImage?.message}
 *   onChange={handleImageChange}
 *   onRemove={handleImageRemove}
 * />
 * ```
 */
export default function ImageUploader({
  label,
  errorMessage,
  images = [],
  maxCount = 1,
  showCounter = false,
  onChange,
  onRemove,
}: ImageUploaderProps) {
  const count = images.length;
  const isDisabled = count >= maxCount;
  const isError = !!errorMessage;

  return (
    <FormField label={label} labelWeight="bold" errorMessage={errorMessage}>
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
              'aria-disabled:bg-gray-50 aria-disabled:text-gray-500'
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
            disabled={isDisabled}
            onChange={onChange}
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
