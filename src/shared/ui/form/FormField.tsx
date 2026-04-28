'use client';

import { createContext, useContext, useId, type ReactNode } from 'react';
import FormErrorMessage from '@/shared/ui/form/FormErrorMessage';
import FormLabel from '@/shared/ui/form/FormLabel';
import { cn } from '@/shared/utils/cn';

// ID와 에러 상태를 백그라운드에서 전달하기 위해 사용
const FormFieldContext = createContext<{ id: string; errorId: string; isError: boolean } | null>(
  null
);
export const useFormField = () => useContext(FormFieldContext);

type FormFieldProps = {
  label?: string;
  labelWeight?: 'medium' | 'bold';
  errorMessage?: string;
  className?: string;
  labelClassName?: string;
  labelTextClassName?: string;
  labelAction?: ReactNode;
  errorMessageClassName?: string;
  children: ReactNode;
};

/**
 * 폼 입력 요소(Input, Textarea, Dropdown 등)를 감싸 라벨과 에러 메시지를 함께 렌더링하는 제어용 Wrapper 컴포넌트입니다.
 * 내부적으로 고유 ID를 생성하여 하위 요소들에게 Context로 제공하므로, 명시적으로 id를 부여하지 않아도 접근성이 자동으로 연결됩니다.
 * * @example
 * ```tsx
 * <FormField
 * label="주소"
 * errorMessage={errors.address?.message}
 * labelAction={<button type="button">우편번호 찾기</button>}
 * >
 * <FormInput name="address" control={control} />
 * </FormField>
 * ```
 */
export default function FormField({
  label,
  labelWeight = 'medium',
  errorMessage,
  className,
  labelClassName,
  labelTextClassName,
  labelAction,
  errorMessageClassName,
  children,
}: FormFieldProps) {
  // 컴포넌트가 렌더링될 때마다 인풋과 연결할 고유한 ID 생성
  const uniqueId = useId();
  const fieldId = `field-${uniqueId}`;
  const errorId = `error-${uniqueId}`;

  return (
    <FormFieldContext.Provider value={{ id: fieldId, errorId, isError: !!errorMessage }}>
      <div className={cn('flex flex-col', className)}>
        {(label || labelAction) && (
          <div className={cn('mb-2.5 flex items-center justify-between', labelClassName)}>
            {label && (
              <FormLabel
                htmlFor={fieldId}
                weight={labelWeight}
                className={cn('mb-0', labelTextClassName)}
              >
                {label}
              </FormLabel>
            )}
            {labelAction && <div>{labelAction}</div>}
          </div>
        )}

        {children}

        {errorMessage && (
          <FormErrorMessage id={errorId} className={cn('mt-1.5', errorMessageClassName)}>
            {errorMessage}
          </FormErrorMessage>
        )}
      </div>
    </FormFieldContext.Provider>
  );
}
