import { WithChildren } from '@/shared/types/common';

export default function ActivityLayout({ children }: WithChildren) {
  return (
    <div className="w-full pb-15.25 md:pb-9.25">
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:pt-14">{children}</div>
    </div>
  );
}
