/*
  Warnings:

  - A unique constraint covering the columns `[ctg_label]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "category_ctg_label_key" ON "category"("ctg_label");
