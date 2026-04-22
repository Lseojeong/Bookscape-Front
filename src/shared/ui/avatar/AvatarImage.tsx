import Image, { ImageProps } from 'next/image';
import { useAvatarContext } from '@/shared/ui/avatar/context/avatarContext';

export default function AvatarImage(props: Omit<ImageProps, 'src' | 'alt'>) {
  const { user, imageError, setImageError } = useAvatarContext();

  if (!user?.profileImageUrl || imageError) return null;

  return (
    <Image
      src={user.profileImageUrl}
      alt={`${user?.nickname || '사용자'}님의 프로필 이미지`}
      fill
      className="object-cover"
      onError={() => setImageError(true)}
      unoptimized // TODO : 임시로 작성, 삭제 필요
      {...props}
    />
  );
}
