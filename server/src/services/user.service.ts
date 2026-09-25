import prisma from '#src/config/database.ts';
import { Gender } from '#src/generated/enums.ts';
import logger from '#config/logger.ts';
import {
  CreateUserDto,
  ReturnUserDto,
  TokenPurpose,
  UpdateUserProfileDto,
} from '#src/types/user.js';

function toPrismaGender(gender: string): Gender | undefined {
  const normalizedGender = gender.trim().toUpperCase();

  if (normalizedGender === 'OTHER' || normalizedGender === 'UNSPECIFIED') {
    return Gender.UNISEX;
  }

  return (Gender as Record<string, Gender>)[normalizedGender];
}

export async function findUserByEmail(email: string) {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: 'insensitive',
        },
      },
    });
    // returned user (no debug logging)

    return user;
  } catch (err) {
    logger.error('Error finding user by email:', err);
    throw err;
  }
}

export async function findUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        userBodyImageUrl: true,
        age: true,
        gender: true,
        location: true,
        interests: true,
        passwordHash: true,
        oauthProvider: true,
        oauthId: true,
        emailVerified: true,
        isActive: true,
        deletedAt: true,
      },
    });
    return user;
  } catch (err) {
    logger.error('User Not Found:', err);
    throw err;
  }
}

export async function getUserBodyImageUrl(
  userId: string
): Promise<string | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { userBodyImageUrl: true },
    });
    return user?.userBodyImageUrl || null;
  } catch (err) {
    logger.error('Error fetching user body image URL:', err);
    throw err;
  }
}

export async function createUser(data: CreateUserDto): Promise<ReturnUserDto> {
  try {
    const { email, name, passwordHash } = data;
    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name,
        passwordHash,
        verificationToken: data.verificationToken,
        verificationTokenExpiresAt: data.verificationTokenExpiresAt,
        verificationTokenPurpose: data.verificationTokenPurpose,
      },
    });

    const newUser: ReturnUserDto = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatarUrl || undefined,
      emailVerified: user.emailVerified,
      isActive: user.isActive,
    };

    return newUser;
  } catch (err) {
    logger.error('Error in creating user:', err);
    throw err;
  }
}

export async function updateUserProfile(
  data: UpdateUserProfileDto
): Promise<ReturnUserDto> {
  try {
    const { userId, gender, ...updateData } = data;
    const prismaGender =
      typeof gender === 'string'
        ? toPrismaGender(gender) || (gender as Gender)
        : undefined;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...updateData,
        ...(prismaGender ? { gender: prismaGender } : {}),
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatarUrl || undefined,
      age: user.age || undefined,
      gender: user.gender || undefined,
      location: user.location || undefined,
      interests: user.interests || undefined,

      emailVerified: user.emailVerified,
      isActive: user.isActive,
      userBodyImageUrl: user.userBodyImageUrl || undefined,
    } as ReturnUserDto;
  } catch (err) {
    logger.error('Error in updating user profile:', err);
    throw err;
  }
}

export async function updateUserPassword(
  userId: string,
  newPasswordHash: string
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });
  } catch (err) {
    logger.error('Error in updating user password:', err);
    throw err;
  }
}

// Used by the token-based reset-password flow: updates the password and
// invalidates the reset token in one atomic write so it cannot be reused.
export async function resetUserPassword(
  userId: string,
  newPasswordHash: string
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
        verificationToken: null,
        verificationTokenExpiresAt: null,
        verificationTokenPurpose: null,
      },
    });
  } catch (err) {
    logger.error('Error in resetting user password:', err);
    throw err;
  }
}

export async function verifyUserEmail(
  userId: string,
  verificationToken: string
): Promise<boolean> {
  try {
    const result = await prisma.user.updateMany({
      where: {
        id: userId,
        verificationToken,
        verificationTokenPurpose: 'EMAIL_VERIFICATION',
        verificationTokenExpiresAt: { gt: new Date() },
      },
      data: {
        emailVerified: true,
        isActive: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
        verificationTokenPurpose: null,
      },
    });
    return result.count > 0;
  } catch (err) {
    logger.error('Error in verifying email:', err);
    throw err;
  }
}

export async function findUserByVerificationToken(
  token: string,
  purpose: TokenPurpose
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenPurpose: purpose,
        verificationTokenExpiresAt: { gt: new Date() },
        deletedAt: null,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
