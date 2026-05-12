import { avatarSizeClassNames } from '@/shared/ui/avatar/avatarConstants';
import { AvatarSize } from '@/shared/ui/avatar/types';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import { cn } from '@/shared/utils/cn';

/** 아바타 스켈레톤 UI입니다. */
export default function AvatarSkeleton({
  size = 'lg',
  className,
}: {
  size?: AvatarSize;
  className?: string;
}) {
  return (
    <>
      <Skeleton className={cn('rounded-full', avatarSizeClassNames[size], className)} />
    </>
  );
}
