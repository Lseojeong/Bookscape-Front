/**
 * @file cn 함수 정의
 * @description clsx + tailwind-merge를 함께 사용하여
 * 조건부 className 처리와 Tailwind 클래스 충돌 해결을 동시에 수행하는 유틸 함수
 *
 * ---
 * [clsx 사용 예시]
 *
 * 조건에 따라 class를 동적으로 추가할 수 있음
 *
 * const isActive = true;
 *
 * clsx(
 *   'text-sm',
 *   isActive && 'text-blue-500',
 *   false && 'hidden'
 * )
 * → 'text-sm text-blue-500'
 *
 * ---
 * [tailwind-merge 사용 예시]
 *
 * Tailwind CSS 클래스 충돌 시, 뒤에 오는 값을 우선 적용
 *
 * twMerge('text-sm', 'text-lg')
 * → 'text-lg'
 *
 * twMerge('px-2', 'px-4')
 * → 'px-4'
 *
 * ---
 * [cn 함수 사용 예시]
 *
 * 두 기능을 함께 사용 (실무에서 가장 많이 쓰는 형태)
 *
 * cn(
 *   'text-sm px-2',
 *   isActive && 'text-blue-500',
 *   'text-lg'
 * )
 * → 'px-2 text-blue-500 text-lg'
 *
 * (text-sm은 text-lg로 자동 덮어쓰기됨)
 *
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
