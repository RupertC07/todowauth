/*
  Warnings:

  - You are about to drop the column `isDeletd` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "isDeletd",
ADD COLUMN     "isDeleted" INTEGER NOT NULL DEFAULT 0;
