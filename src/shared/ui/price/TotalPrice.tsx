import PriceDisplay from '@/shared/ui/price/PriceDisplay';

export type TotalPriceProps = {
  totalPrice: number;
  headCount: number;
  showSlash?: boolean;
  priceClassName?: string;
  unitClassName?: string;
};

/**
 * 전체 인원과 총 가격을 표시하는 컴포넌트입니다.
 *
 * @example
 * <TotalPrice
 *   totalPrice={150000}
 *   headCount={5}
 *   priceClassName="text-xl"
 *   unitClassName="text-sm text-blue-500"
 *   showSlash={false} // `/` 구분자 표시 안함
 * />
 *
 */
export default function TotalPrice({
  totalPrice,
  headCount,
  showSlash = true,
  priceClassName,
  unitClassName,
}: TotalPriceProps) {
  return (
    <PriceDisplay
      price={totalPrice}
      unit={`${headCount}명`}
      showSlash={showSlash}
      priceClassName={priceClassName}
      unitClassName={unitClassName}
    />
  );
}
