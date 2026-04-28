import type { CSSProperties } from 'react';

type LoadingStyle = CSSProperties & {
  '--bounce-translate-y'?: string;
};
type LoadingProps = {
  size?: number;
  color?: string;
};

export const Loading = ({ size = 16, color = 'white' }: LoadingProps) => {
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
};
