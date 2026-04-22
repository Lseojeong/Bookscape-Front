import { cn } from '@/shared/utils/cn';

export type TitleAs = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TitleSize = '14' | '16' | '18' | '20' | '24' | '32';

export type TitleWeight = 'medium' | 'bold';

export type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: TitleAs;
  size?: TitleSize;
  weight?: TitleWeight;
  color?: string;
};

export const titleTypoMap: Record<TitleSize, Record<TitleWeight, string>> = {
  '14': {
    medium: 'typo-14-medium',
    bold: 'typo-14-bold',
  },
  '16': {
    medium: 'typo-16-medium',
    bold: 'typo-16-bold',
  },
  '18': {
    medium: 'typo-18-medium',
    bold: 'typo-18-bold',
  },
  '20': {
    medium: 'typo-20-medium',
    bold: 'typo-20-bold',
  },
  '24': {
    medium: 'typo-24-medium',
    bold: 'typo-24-bold',
  },
  '32': {
    medium: 'typo-32-medium',
    bold: 'typo-32-bold',
  },
} as const;

/**
 * 시맨틱 헤딩 태그를 렌더링하는 타이틀 컴포넌트입니다.
 *
 * `as` prop으로 h2~h6 태그를 선택할 수 있으며,
 * `size`와 `weight`는 Tailwind 클래스 맵을 통해 스타일링됩니다.
 * 네이티브 HTML 속성(`aria-label`, `id`, `data-*` 등)을 모두 지원합니다.
 *
 * @example 기본 사용
 * ```tsx
 * <Title as="h1" size="lg" weight="bold">페이지 제목</Title>
 * ```
 *
 * @example 색상 커스텀
 * ```tsx
 * <Title as="h2" size="md" color="text-gray-500">서브 타이틀</Title>
 * ```
 *
 */
function Title({
  as: Tag = 'h2',
  size = '20',
  weight = 'bold',
  color = 'text-black-200',
  className,
  children,
  ...props
}: TitleProps) {
  return (
    <Tag className={cn(titleTypoMap[size][weight], color, className)} {...props}>
      {children}
    </Tag>
  );
}

export default Title;
