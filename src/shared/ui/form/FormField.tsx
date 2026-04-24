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
  labelAction?: ReactNode;
  children: ReactNode;
};

/**
 * Input, Textarea, Dropdown 등을 감싸 라벨과 에러 메시지를 함께 렌더링하는 제어용 Wrapper 컴포넌트입니다.
 * @example
 * ```tsx
 * <FormField label="이메일" errorMessage="이메일 형식으로 작성해 주세요.">
 * <Input placeholder="이메일 입력" />
 * </FormField>
 * ```
 */
export default function FormField({
  label,
  labelWeight,
  errorMessage,
  className,
  labelClassName,
  labelAction,
  children,
}: FormFieldProps) {
  // 컴포넌트가 렌더링될 때마다 인풋과 연결할 고유한 ID 생성
  const uniqueId = useId();
  const fieldId = `field-${uniqueId}`;
  const errorId = `error-${uniqueId}`;

  return (
    <FormFieldContext.Provider value={{ id: fieldId, errorId: errorId, isError: !!errorMessage }}>
      <div className={cn('flex flex-col', className)}>
        {(label || labelAction) && (
          <div className={cn('mb-2.5 flex items-center justify-between', labelClassName)}>
            {label && (
              <FormLabel htmlFor={fieldId} weight={labelWeight} className="mb-0">
                {label}
              </FormLabel>
            )}
            {labelAction && <div>{labelAction}</div>}
          </div>
        )}

        {children}

        {errorMessage && (
          <FormErrorMessage id={errorId} className="mt-1.5">
            {errorMessage}
          </FormErrorMessage>
        )}
      </div>
    </FormFieldContext.Provider>
  );
}
