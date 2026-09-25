-- CreateEnum
CREATE TYPE "TokenPurpose" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verification_token_expires_at" TIMESTAMP(3),
ADD COLUMN     "verification_token_purpose" "TokenPurpose";
