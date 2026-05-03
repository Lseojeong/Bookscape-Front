'use client';

import Image from 'next/image';
import { PlusIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import { cn } from '@/shared/utils/cn';
import DeleteButton from './DeleteButton';

// TODO: 유효성 검사 로직이 머지되면 아래 임시 상수를 지우고 import 해서 사용할 것!
const IMAGE_RULES = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
} as const;

export type ImageUploaderProps = {
  label?: string;
  errorMessage?: string;
  images: (File | string)[];
  maxCount?: number;
  showCounter?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
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
export function ImageUploader({
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
            isDisabled
              ? 'cursor-not-allowed bg-gray-25 shadow-[0_1px_10px_rgba(0,0,0,0.1)]'
              : 'cursor-pointer bg-white'
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
            className="hidden"
            accept={IMAGE_RULES.ACCEPTED_TYPES.join(',')}
            disabled={isDisabled}
            onChange={onChange}
          />
        </label>

        {images.map((img, idx) => {
          const imgSrc = typeof img === 'string' ? img : URL.createObjectURL(img);
          return (
            <div key={idx} className="relative h-20 w-20 md:h-32 md:w-32">
              <div
                className={cn(
                  'relative h-full w-full overflow-hidden rounded-lg border md:rounded-2xl',
                  isError ? 'border-error' : 'border-gray-100'
                )}
              >
                <Image
                  src={imgSrc}
                  alt={`preview-${idx}`}
                  fill
                  className="object-cover"
                  unoptimized={typeof img !== 'string'}
                />
              </div>

              <DeleteButton
                className="absolute -top-1 -right-1 layer-base"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(idx);
                }}
              />
            </div>
          );
        })}
      </div>
    </FormField>
  );
}
