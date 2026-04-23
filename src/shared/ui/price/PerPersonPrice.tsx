import PriceDisplay from '@/shared/ui/price/PriceDisplay';
import { PerPersonPriceProps } from '@/shared/ui/price/types';

/**
 * 1인당 가격을 표시하는 컴포넌트입니다.
 *
 * @example
 * // ₩30,000/인
 * <PerPersonPrice pricePerPerson={30000} />
 */
export default function PerPersonPrice({ pricePerPerson }: PerPersonPriceProps) {
  return <PriceDisplay price={pricePerPerson} unit="인" />;
}
