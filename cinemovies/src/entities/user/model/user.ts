export interface AuthUser {
  id: number;
  email: string;
  isActivated: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
