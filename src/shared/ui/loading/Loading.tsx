import type { CSSProperties } from 'react';

type LoadingStyle = CSSProperties & {
  '--bounce-translate-y'?: string;
};

/**
 * `Loading` 컴포넌트의 Props 입니다.
 */
type LoadingProps = {
  /**
   * 로딩 점(dot) 컨테이너의 기준 크기(px)입니다.
   * - 점 크기/간격/애니메이션 이동 거리가 이 값을 기준으로 계산됩니다.
   * @default 16
   */
  size?: number;
  /**
   * 로딩 점(dot)의 색상입니다.
   * - 디자인 토큰으로 정해놓은 색상을 전달할 수 있습니다.
   * @default 'white'
   */
  color?: string;
};

/**
 * 점(dot) 3개가 튕기듯(bounce) 움직이는 로딩 인디케이터입니다.
 *
 * @example
 * <Loading />
 *
 * @example
 * <Loading size={20} color="var(--color-gray-600)" />
 */
export default function Loading({ size = 16, color = 'white' }: LoadingProps) {
  const dotSize = size * 0.25;
  const gap = size * 0.15;
  const containerStyle: LoadingStyle = {
    '--bounce-translate-y': `-${size * 0.25}px`,
    gap: `${gap}px`,
    height: `${size}px`,
  };

  return (
    <div className="inline-flex items-center justify-center" style={containerStyle}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="loading-dot rounded-full"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}
