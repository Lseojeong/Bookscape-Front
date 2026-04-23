import PriceDisplay from '@/shared/ui/price/PriceDisplay';

export type PerPersonPriceProps = {
  pricePerPerson: number;
  priceClassName?: string;
  unitClassName?: string;
};

/**
 * 1인당 가격을 표시하는 컴포넌트입니다.
 *
 * @example
 * <PerPersonPrice pricePerPerson={30000} />
 *
 */
export default function PerPersonPrice({
  pricePerPerson,
  priceClassName,
  unitClassName,
}: PerPersonPriceProps) {
  return (
    <PriceDisplay
      price={pricePerPerson}
      unit="인"
      priceClassName={priceClassName}
      unitClassName={unitClassName}
    />
  );
}
