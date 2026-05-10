'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import Star from '@/features/reservation/reservation-list/ui/review-modal/Star';
import type { ReviewFormValues } from '@/features/reservation/reservation-list/utils/schema';
import { reviewFormSchema } from '@/features/reservation/reservation-list/utils/schema';
import { DeleteIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';
import FormField from '@/shared/ui/form/FormField';
import FormTextarea from '@/shared/ui/form/FormTextarea';
import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';
import Title from '@/shared/ui/title/Title';
import { cn } from '@/shared/utils/cn';

export type ReviewModalSubmitPayload = {
  rating: number;
  content: string;
};

/**
 * `ReviewModal` 컴포넌트 props입니다.
 *
 * @param isOpen - 모달 오픈 여부입니다.
 * @param onClose - 모달 닫기 핸들러입니다.
 * @param activityTitle - 체험 제목입니다.
 * @param scheduleText - 일정 표기 문자열입니다. (예: `2023. 02. 14 / 11:00 - 12:30 (10명)`)
 * @param onSubmit - 제출 시 호출되는 콜백입니다.
 * @param defaultContent - 기본 리뷰 내용입니다.
 * @param className - 최상위 form wrapper 클래스입니다.
 */
export type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  activityTitle: string;
  scheduleText: string;
  onSubmit?: (payload: ReviewModalSubmitPayload) => void | Promise<void>;
  defaultContent?: string;
  className?: string;
};

/**
 * ## ReviewModal
 *
 * 리뷰 작성 모달 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ReviewModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   activityTitle="함께 배우면 즐거운 스트릿 댄스"
 *   scheduleText="2023. 02. 14 / 11:00 - 12:30 (10명)"
 *   onSubmit={({ rating, content }) => console.log(rating, content)}
 * />
 * ```
 *
 * @remarks
 * - 제출 중 또는 작성 중(별점/내용 입력 시)에는 ESC/바깥 클릭으로 닫히지 않습니다.
 * - 닫힐 때 별점/내용이 초기화됩니다.
 */
export default function ReviewModal({
  isOpen,
  onClose,
  activityTitle,
  scheduleText,
  onSubmit,
  defaultContent = '',
  className,
}: ReviewModalProps) {
  const { control, handleSubmit, reset, setValue, formState } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rating: 0, content: defaultContent },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const handleClose = () => {
    onClose();
    reset({ rating: 0, content: defaultContent });
  };

  const rating = useWatch({ control, name: 'rating' }) ?? 0;
  const contentValue = useWatch({ control, name: 'content' }) ?? '';
  const isEditing = rating > 0 || contentValue.trim().length > 0;
  const shouldBlockAutoClose = formState.isSubmitting || isEditing;

  const submit = handleSubmit(async ({ rating, content }) => {
    try {
      await onSubmit?.({ rating, content });
      handleClose();
    } catch {
      // NOTE: onSubmit 실패 시 모달을 닫지 않고 유지합니다.
    }
  });

  return (
    <OverlayLayer
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabel="리뷰 작성"
      position="center"
      variant="dialog"
      surfaceClassName="w-96.25"
      contentClassName="dialog-surface-animation rounded-[30px] px-7.5 py-8"
      closeOnOverlayClick={!shouldBlockAutoClose}
      closeOnEsc={!shouldBlockAutoClose}
    >
      <div className={cn('flex flex-col', className)}>
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="닫기"
            onClick={handleClose}
            disabled={formState.isSubmitting}
            className="p-1 outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <DeleteIcon className="h-6 w-6 text-gray-950" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-7.5">
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col items-center text-center">
              <Title as="h2" size="16" weight="bold" color="text-gray-950">
                {activityTitle}
              </Title>
              <p className="mt-1 typo-14-medium text-gray-500">{scheduleText}</p>
            </div>

            <div className="flex justify-center">
              <FormField
                label="별점"
                labelTextClassName="sr-only"
                errorMessage={formState.errors.rating?.message}
                errorMessageClassName="text-center"
              >
                <Star
                  value={rating}
                  onChange={(next) =>
                    setValue('rating', next, { shouldDirty: true, shouldValidate: true })
                  }
                  ariaLabel="별점 선택"
                />
              </FormField>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-81.25">
              <FormField
                label="소중한 경험을 들려주세요"
                labelTextClassName="typo-18-bold text-gray-950"
                labelClassName="mb-4"
                errorMessage={formState.errors.content?.message}
              >
                <FormTextarea
                  name="content"
                  control={control}
                  variant="review"
                  placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
                  maxLength={100}
                />
              </FormField>
            </div>
          </div>

          <Button
            theme="primary"
            size="lg"
            type="submit"
            disabled={formState.isSubmitting}
            isLoading={formState.isSubmitting}
            className="h-13.5 w-full rounded-2xl"
          >
            작성하기
          </Button>
        </form>
      </div>
    </OverlayLayer>
  );
}
