import prisma from '#src/config/database.ts';
import logger from '#config/logger.ts';

export async function saveRefreshToken(
  userId: string,
  refreshToken: string,
  sessionId: string,
  userAgent?: string,
  ipAddress?: string
) {
  try {
    await prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        sessionId,
        userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      },
    });
  } catch (err) {
    logger.error('Error in saving refresh token:', err);
    throw err;
  }
}

export async function findRefreshToken(token: string) {
  try {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        token,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });
    return refreshToken;
  } catch (err) {
    logger.error('Refresh Token Not Found:', err);
    throw err;
  }
}

export async function deleteAllRefreshTokens(userId: string) {
  try {
    await prisma.refreshToken.deleteMany({ where: { userId } });
  } catch (err) {
    logger.error('Error in deleting refresh token:', err);
    throw err;
  }
}

export async function deleteCurrentRefreshToken(sessionId: string) {
  try {
    await prisma.refreshToken.deleteMany({ where: { sessionId } });
  } catch (err) {
    logger.error('Error in deleting user refresh tokens:', err);
    throw err;
  }
}

export async function isValidSession(userId: string, sessionId: string) {
  try {
    const token = await prisma.refreshToken.findFirst({
      where: {
        userId,
        sessionId,
        expiresAt: { gt: new Date() },
        isActive: true,
      },
      select: { userId: true, sessionId: true },
    });
    return !!token;
  } catch (err) {
    logger.error('Error in validating session:', err);
    throw err;
  }
}

export async function revokeSession(userId: string, sessionId: string) {
  try {
    await prisma.refreshToken.updateMany({
      where: { userId, sessionId },
      data: { isActive: false },
    });
  } catch (err) {
    logger.error('Error in revoking session:', err);
    throw err;
  }
}
