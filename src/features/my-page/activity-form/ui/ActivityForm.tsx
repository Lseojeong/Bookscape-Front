'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ACTIVITY_CATEGORIES } from '@/features/my-page/activity-form/constants/category';
import { AddressInput } from '@/features/my-page/activity-form/ui/address-input/AddressInput';
import ImageUploader from '@/features/my-page/activity-form/ui/image-uploader/ImageUploader';
import ScheduleSelector from '@/features/my-page/activity-form/ui/schedule-selector/ScheduleSelector';
import {
  activityFormSchema,
  ActivityFormValues,
} from '@/features/my-page/activity-form/utils/schema';
import Button from '@/shared/ui/button/Button';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/ui/dropdown/select';
import FormField from '@/shared/ui/form/FormField';
import FormInput from '@/shared/ui/form/FormInput';
import FormTextarea from '@/shared/ui/form/FormTextarea';
import PriceInput from '@/shared/ui/input/PriceInput';

export type ActivityInitialData = Partial<ActivityFormValues>;

type ActivityFormProps = {
  /** 'create' 모드일 때는 등록, 'edit' 모드일 때는 수정 폼으로 동작합니다. */
  mode: 'create' | 'edit';
  /** 수정 모드일 때 부모 페이지에서 주입받는 초기 데이터입니다. */
  initialData?: ActivityInitialData;
  /** 부모 컴포넌트에 최종 폼 데이터를 전달하기 위한 콜백 함수입니다. */
  onSubmitForm: (data: ActivityFormValues) => void;
  /** 폼 내의 취소 버튼을 눌렀을 때 실행될 콜백 함수입니다. */
  onCancelForm: () => void;
};

/**
 * 체험 활동 등록 및 수정을 위한 전체 폼 UI를 구성하는 컴포넌트입니다.
 * React Hook Form과 Zod 스키마를 사용하여 내부 입력값들의 유효성을 검사합니다.
 *
 * @example
 * ```tsx
 * <ActivityForm
 * mode="create"
 * onSubmitForm={(data) => mutate(data)}
 * />
 * ```
 */
export default function ActivityForm({
  mode,
  initialData,
  onSubmitForm,
  onCancelForm,
}: ActivityFormProps) {
  const methods = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      category: undefined,
      description: '',
      price: undefined,
      address: '',
      detailAddress: '',
      schedules: [],
      bannerImage: null,
      subImages: [],
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // 수정 모드일 때 초기 데이터 주입
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      reset(initialData);
    }
  }, [mode, initialData, reset]);

  // 유효성 검사 통과 후 호출되는 폼 제출 핸들러
  const handleFormSubmit = (data: ActivityFormValues) => {
    onSubmitForm(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mx-auto flex w-full max-w-3xl flex-col"
      >
        {/* 기본 정보 그룹 */}
        <section className="flex flex-col gap-6">
          <FormField label="제목" labelWeight="bold" errorMessage={errors.title?.message}>
            <FormInput name="title" control={control} placeholder="제목을 입력해 주세요" />
          </FormField>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormField
                label="카테고리"
                labelWeight="bold"
                errorMessage={errors.category?.message}
              >
                <SelectDropdown value={field.value || ''} onChangeValue={field.onChange}>
                  <SelectDropdownTrigger isError={!!errors.category}>
                    <SelectDropdownValue placeholder="카테고리를 선택해 주세요" />
                  </SelectDropdownTrigger>
                  <SelectDropdownContent>
                    {ACTIVITY_CATEGORIES.map((cat) => (
                      <SelectDropdownItem key={cat} value={cat}>
                        {cat}
                      </SelectDropdownItem>
                    ))}
                  </SelectDropdownContent>
                </SelectDropdown>
              </FormField>
            )}
          />
          <FormField label="설명" labelWeight="bold" errorMessage={errors.description?.message}>
            <FormTextarea
              name="description"
              control={control}
              placeholder="체험에 대한 설명을 입력해 주세요"
              maxLength={1000}
              variant="activity"
            />
          </FormField>
          <FormField label="가격" labelWeight="bold" errorMessage={errors.price?.message}>
            <PriceInput name="price" control={control} placeholder="체험 금액을 입력해 주세요" />
          </FormField>
          <AddressInput />
        </section>

        {/* 예약 가능한 시간대 */}
        <div className="mt-7.5">
          <ScheduleSelector />
        </div>

        {/* 배너 이미지 등록 */}
        <div className="mt-7.5">
          <Controller
            name="bannerImage"
            control={control}
            render={({ field }) => (
              <ImageUploader
                label="배너 이미지 등록"
                images={field.value ? [field.value] : []}
                maxCount={1}
                errorMessage={errors.bannerImage?.message}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) field.onChange(file);
                  e.target.value = '';
                }}
                onRemove={() => field.onChange(null)}
              />
            )}
          />
        </div>

        {/* 소개 이미지 등록 */}
        <div className="mt-7.5">
          <Controller
            name="subImages"
            control={control}
            render={({ field }) => {
              const currentImages = field.value || [];
              return (
                <ImageUploader
                  label="소개 이미지 등록(선택)"
                  showCounter
                  images={currentImages}
                  maxCount={4}
                  errorMessage={errors.subImages?.message}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && currentImages.length < 4) {
                      field.onChange([...currentImages, file]);
                    }
                    e.target.value = '';
                  }}
                  onRemove={(index) => {
                    const newImages = [...currentImages];
                    newImages.splice(index, 1);
                    field.onChange(newImages);
                  }}
                />
              );
            }}
          />
        </div>

        {/* 버튼 그룹 */}
        <div className="mt-7.25 flex justify-center gap-4 md:mt-10">
          <Button
            type="button"
            theme="secondary"
            size="md"
            className="h-12 w-39.25 md:h-10.75 md:w-30"
            onClick={onCancelForm}
          >
            취소하기
          </Button>
          <Button
            type="submit"
            theme="primary"
            size="md"
            className="h-12 w-39.25 md:h-10.75 md:w-30"
          >
            {mode === 'create' ? '등록하기' : '수정하기'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
