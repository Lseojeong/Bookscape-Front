import { useController, FieldValues } from 'react-hook-form';
import Input, { InputProps } from '@/shared/ui/input/Input';

type PriceInputProps<T extends FieldValues> = Omit<InputProps<T>, 'onChange'>;

/**
 * React Hook Form과 연동하여 금액(숫자)을 입력받는 전용 Input 컴포넌트입니다.
 * * 사용자가 값을 입력하면 화면(UI)에는 천 단위 콤마(,)가 포함된 포맷으로 표시되지만,
 * 내부 폼 상태(RHF)에는 콤마가 제거된 순수 숫자 문자열만 안전하게 저장됩니다.
 * 숫자가 아닌 문자 입력은 정규식을 통해 자동으로 무시됩니다.
 * * @template T - 폼 필드 값들의 타입 (FieldValues)
 * * @example
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import PriceInput from '@/shared/ui/input/PriceInput';
 * type FormValues = {
 * price: string;
 * }
 * export default function Page() {
 * const { control } = useForm<FormValues>();
 * return (
 * <PriceInput<FormValues>
 * name="price"
 * control={control}
 * placeholder="금액을 입력해주세요"
 * />
 * );
 * }
 * ```
 */
export default function PriceInput<T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: PriceInputProps<T>) {
  const { field } = useController({ name, control, rules });

  // NOTE: 화면에 표시될 데이터와 실제 폼 데이터를 분리하기 위해 이벤트를 가로채어 숫자만 RHF에 전달
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');

    field.onChange(rawValue);
  };

  const displayValue = field.value ? Number(field.value).toLocaleString() : '';

  return (
    <Input
      {...props}
      name={name}
      control={control}
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
    />
  );
}
