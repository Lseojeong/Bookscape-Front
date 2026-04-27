'use client';

import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';
import { useFormField } from '@/shared/ui/form/FormField';
import Input from '@/shared/ui/input/Input';

type PriceInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<React.ComponentProps<'input'>, 'name' | 'value' | 'onChange'> & {
    isError?: boolean;
  };

/**
 * React Hook Form과 연동하여 금액(숫자)을 입력받는 전용 Input 컴포넌트입니다.
 * * 사용자가 값을 입력하면 화면(UI)에는 천 단위 콤마(,)가 포함된 포맷으로 표시되지만,
 * 내부 폼 상태(RHF)에는 콤마가 제거된 순수 숫자 문자열만 안전하게 저장됩니다.
 * 숫자가 아닌 문자 입력은 정규식을 통해 자동으로 무시됩니다.
 * * @template T - 폼 필드 값들의 타입 (FieldValues)
 * * @example
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import FormField from '@/shared/ui/form/FormField';
 * import PriceInput from '@/shared/ui/input/PriceInput';
 * * type FormValues = { price: string; };
 * * export default function Page() {
 * const { control, formState: { errors } } = useForm<FormValues>();
 * * return (
 * <FormField label="체험 가격" errorMessage={errors.price?.message}>
 * <PriceInput<FormValues>
 * name="price"
 * control={control}
 * placeholder="금액을 입력해주세요"
 * />
 * </FormField>
 * );
 * }
 * ```
 */
export default function PriceInput<T extends FieldValues>({
  name,
  control,
  rules,
  isError: isErrorProp,
  ...props
}: PriceInputProps<T>) {
  const {
    field: { value, onChange, ...restField },
    fieldState: { error },
  } = useController({ name, control, rules });

  const formField = useFormField();
  const isError = isErrorProp ?? (!!error || !!formField?.isError);
  const inputId = props.id ?? formField?.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(rawValue);
  };

  const displayValue = value ? Number(value).toLocaleString() : '';

  return (
    <Input
      {...props}
      {...restField}
      id={inputId}
      value={displayValue}
      onChange={handleChange}
      inputMode="numeric"
      isError={isError}
      aria-describedby={isError ? formField?.errorId : undefined}
    />
  );
}
