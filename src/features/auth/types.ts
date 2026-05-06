export type LoginRequest = {
  email: string;
  password: string;
};

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = AuthResponse;
export type RefreshResponse = AuthResponse;
