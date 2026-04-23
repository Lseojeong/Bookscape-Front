import PriceDisplay from '@/shared/ui/price/PriceDisplay';
import { TotalPriceProps } from '@/shared/ui/price/types';

/**
 * 전체 인원 기준 총 가격을 표시하는 컴포넌트입니다.
 *
 * @example
 * // ₩150,000/5명
 * <TotalPrice totalPrice={150000} headCount={5} />
 */
export default function TotalPrice({ totalPrice, headCount }: TotalPriceProps) {
  return <PriceDisplay price={totalPrice} unit={`${headCount}명`} />;
}
