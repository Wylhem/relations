/*
  Warnings:

  - You are about to drop the column `cmt_comment` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `flw_followers` on the `follow` table. All the data in the column will be lost.
  - You are about to drop the column `picturePct_id` on the `profile` table. All the data in the column will be lost.
  - The `vdo_size` column on the `video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[per_picture]` on the table `person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cmt_post` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pcg_updatedAt` to the `post_category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_cmt_comment_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_flw_followers_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_picturePct_id_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "cmt_comment",
ADD COLUMN     "cmt_post" UUID NOT NULL;

-- AlterTable
ALTER TABLE "follow" DROP COLUMN "flw_followers",
ADD COLUMN     "flw_person" UUID;

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "per_picture" UUID;

-- AlterTable
ALTER TABLE "picture" ALTER COLUMN "pct_size" DROP NOT NULL;

-- AlterTable
ALTER TABLE "post_category" ADD COLUMN     "pcg_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pcg_updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "picturePct_id";

-- AlterTable
ALTER TABLE "video" DROP COLUMN "vdo_size",
ADD COLUMN     "vdo_size" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "person_per_picture_key" ON "person"("per_picture");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_per_picture_fkey" FOREIGN KEY ("per_picture") REFERENCES "picture"("pct_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_cmt_post_fkey" FOREIGN KEY ("cmt_post") REFERENCES "post"("pst_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_flw_person_fkey" FOREIGN KEY ("flw_person") REFERENCES "person"("per_id") ON DELETE SET NULL ON UPDATE CASCADE;
