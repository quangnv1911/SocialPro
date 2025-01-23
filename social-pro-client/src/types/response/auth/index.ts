export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  role: string;
  name: string;
  email: string;
  image: string;
};
export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
