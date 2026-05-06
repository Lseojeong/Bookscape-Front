export type UserResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateMyProfileRequestBody = {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
};

export type CreateMyProfileImageUrlResponse = {
  profileImageUrl: string;
};
