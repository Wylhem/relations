/*
  Warnings:

  - You are about to drop the column `pcg_person` on the `post_category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_pcg_person_fkey";

-- AlterTable
ALTER TABLE "post_category" DROP COLUMN "pcg_person",
ADD COLUMN     "pgc_post" UUID;

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_pgc_post_fkey" FOREIGN KEY ("pgc_post") REFERENCES "post"("pst_id") ON DELETE SET NULL ON UPDATE CASCADE;
