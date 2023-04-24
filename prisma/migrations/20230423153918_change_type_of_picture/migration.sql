/*
  Warnings:

  - Changed the type of `pct_size` on the `picture` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "picture" DROP COLUMN "pct_size",
ADD COLUMN     "pct_size" INTEGER NOT NULL;
