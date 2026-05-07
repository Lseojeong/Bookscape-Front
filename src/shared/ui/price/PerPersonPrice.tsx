import PriceDisplay from '@/shared/ui/price/PriceDisplay';

export type PerPersonPriceProps = {
  pricePerPerson: number;
  unit?: string;
  showSlash?: boolean;
  priceClassName?: string;
  unitClassName?: string;
};

/**
 * 1인당 가격을 표시하는 컴포넌트입니다.
 *
 * 기본적으로 "인" 단위를 사용하지만,
 * 필요 시 외부에서 제어 할 수 있습니다.
 *
 * @example
 * ```tsx
 * <PerPersonPrice pricePerPerson={30000} />
 *
 * <PerPersonPrice pricePerPerson={30000} unit="명" />
 * ```
 */
export default function PerPersonPrice({
  pricePerPerson,
  unit = '인',
  showSlash = true,
  priceClassName,
  unitClassName,
}: PerPersonPriceProps) {
  return (
    <PriceDisplay
      price={pricePerPerson}
      unit={unit}
      showSlash={showSlash}
      priceClassName={priceClassName}
      unitClassName={unitClassName}
    />
  );
}
