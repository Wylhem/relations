/*
  Warnings:

  - Added the required column `lck_updatedAt` to the `like_comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lkp_updatedAt` to the `like_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "like_comment" ADD COLUMN     "lck_updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lkc_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "like_post" ADD COLUMN     "lkp_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lkp_updatedAt" TIMESTAMP(3) NOT NULL;
