import { LocationIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

type ActivityAddressProps = {
  address: string;
  className?: string;
};

export default function ActivityAddress({ address, className }: ActivityAddressProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <LocationIcon aria-hidden className="h-4 w-4" />
      <p className="typo-14-medium text-gray-700">{address}</p>
    </div>
  );
}
