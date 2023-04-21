/*
  Warnings:

  - You are about to drop the column `usr_refreshtoken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "usr_refreshtoken",
ADD COLUMN     "usr_refreshToken" TEXT;
