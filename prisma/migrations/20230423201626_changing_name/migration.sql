/*
  Warnings:

  - You are about to drop the column `flw_person` on the `follow` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_flw_person_fkey";

-- AlterTable
ALTER TABLE "follow" DROP COLUMN "flw_person",
ADD COLUMN     "flw_follower" UUID;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_flw_follower_fkey" FOREIGN KEY ("flw_follower") REFERENCES "person"("per_id") ON DELETE SET NULL ON UPDATE CASCADE;
