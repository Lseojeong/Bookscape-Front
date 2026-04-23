import { cn } from '@/shared/utils/cn';

export type PriceDisplayProps = {
  price: number;
  /** 가격 뒤에 붙는 단위. "인" 또는 "명" */
  unit: string;
  /** 기본값: typo-18-bold */
  priceClassName?: string;
  /** 기본값: typo-16-medium */
  unitClassName?: string;
};

/**
 * 가격과 단위를 함께 표시하는 기본 가격 표시 컴포넌트입니다.
 *
 * 'PerPersonPrice', 'TotalPrice' 컴포넌트의 베이스로 사용되며,
 * 가격은 한국 원화(₩) 형식으로 자동 포맷됩니다.
 *
 * @example
 * <PriceDisplay price={150000} unit="인" />
 */
export default function PriceDisplay({
  price,
  unit,
  priceClassName,
  unitClassName,
}: PriceDisplayProps) {
  return (
    <span className={cn('typo-18-bold text-gray-950', priceClassName)}>
      ₩{price.toLocaleString('ko-KR')}
      <span className={cn('typo-16-medium text-gray-500', unitClassName)}>/{unit}</span>
    </span>
  );
}
