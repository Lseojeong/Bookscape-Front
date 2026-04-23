/**
 * 가격 관련 컴포넌트에서 사용되는 타입 정의
 */

/** 가격 표시를 위한 타입 */
export type PriceDisplayProps = {
  price: number;
  unit: string; // 인 또는 명
};

/** 1인당 가격 표시를 위한 타입 */
export type PerPersonPriceProps = {
  pricePerPerson: number;
};

/** 총 금액 + 인원 표시를 위한 타입 */
export type TotalPriceProps = {
  totalPrice: number;
  headCount: number;
};
