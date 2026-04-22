import Image, { ImageProps } from 'next/image';
import { useAvatarUser } from '@/shared/ui/avatar/context/avatarContext';

export default function AvatarImage(props: Omit<ImageProps, 'src' | 'alt'>) {
  const avatarUser = useAvatarUser();

  if (!avatarUser?.profileImageUrl) return null;

  return (
    <Image
      src={avatarUser?.profileImageUrl}
      alt={`${avatarUser?.nickname || '사용자'}님의 프로필 이미지`}
      fill
      className="object-cover"
      unoptimized // TODO : 임시로 작성, 삭제 필요
      {...props}
    />
  );
}
