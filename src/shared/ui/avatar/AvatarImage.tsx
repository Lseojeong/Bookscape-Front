import Image from 'next/image';
import { useAvatarContext } from '@/shared/ui/avatar/context/avatarContext';
import { AvatarImgProps } from '@/shared/ui/avatar/types';

export default function AvatarImage(props: AvatarImgProps) {
  const { user, imageError, setImageError } = useAvatarContext();

  if (!user?.profileImageUrl || imageError) return null;

  return (
    <Image
      src={user.profileImageUrl}
      alt={`${user?.nickname || '사용자'}님의 프로필 이미지`}
      fill
      className="object-cover"
      onError={() => setImageError(true)}
      {...props}
    />
  );
}
