export type TokenPurpose = 'EMAIL_VERIFICATION' | 'PASSWORD_RESET';

export type CreateUserDto = {
  email: string;
  name: string;
  verificationToken: string;
  verificationTokenExpiresAt?: Date;
  verificationTokenPurpose?: TokenPurpose;
  passwordHash: string;
};

export type ReturnUserDto = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  userBodyImageUrl?: string;
  age?: number;
  gender?: string;
  location?: string;
  interests?: string[];
  emailVerified: boolean;
  isActive: boolean;
  age?: number;
};

export type UpdateUserProfileDto = {
  userId: string;
  name?: string;
  avatarUrl?: string;
  userBodyImageUrl?: string;
  age?: number;
  gender?: string;
  location?: string;
  interests?: string[];
  verificationToken?: string | null;
  verificationTokenExpiresAt?: Date | null;
  verificationTokenPurpose?: TokenPurpose | null;
  isActive?: boolean;
  deletedAt?: Date | null;
};
