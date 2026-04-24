import { type ComponentProps } from 'react';
import Input from './Input';

type PriceInputProps = ComponentProps<typeof Input>;

/**
 * 금액/숫자 전용 Input 컴포넌트입니다.
 * @example
 * ```tsx
 * <FormField label="가격" errorMessage={errors.price?.message}>
 * <PriceInput placeholder="체험 금액을 입력해 주세요" {...register('price')} />
 * </FormField>
 * ```
 * 화면에는 천 단위 콤마가 표시되지만, 부모에는 순수 숫자 문자열이 전달됩니다.
 */
export default function PriceInput({ onChange, ...props }: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아닌 모든 문자를 제거
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    // 천 단위 콤마 붙임
    const formattedValue = rawValue ? Number(rawValue).toLocaleString() : '';

    e.target.value = formattedValue;

    if (onChange) {
      const eventForParent = {
        ...e,
        target: {
          ...e.target,
          name: e.target.name,
          value: rawValue, // 숫자만 전달하도록 함
        },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(eventForParent);
    }
  };

  return <Input {...props} type="text" inputMode="numeric" onChange={handleChange} />;
}
