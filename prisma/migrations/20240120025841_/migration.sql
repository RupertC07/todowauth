-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userName" DROP NOT NULL,
ALTER COLUMN "userEmail" DROP NOT NULL,
ALTER COLUMN "userPassword" DROP NOT NULL;
