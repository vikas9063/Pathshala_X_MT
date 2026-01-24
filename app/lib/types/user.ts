export type LoginResponse = {
    userName: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    type: string;
};

export type UserProfile = {
  accountLocked: boolean;
  deleted: boolean;
  email: string;
  enabled: boolean;
  mobileNo: string;
  name: string;
  permissions: string[];  
  role: string;           
  userId: number;
  userName: string;
};
