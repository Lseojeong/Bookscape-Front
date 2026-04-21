declare module '*.svg' {
  import type { SVGProps } from 'react';

  const SvgComponent: React.FC<SVGProps<SVGSVGElement>>;
  export default SvgComponent;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}
