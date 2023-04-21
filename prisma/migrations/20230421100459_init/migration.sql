-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "civility" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "users" (
    "usr_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usr_username" TEXT,
    "usr_email" TEXT NOT NULL,
    "usr_password" TEXT NOT NULL,
    "usr_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usr_updatedAt" TIMESTAMP(3) NOT NULL,
    "usr_person" UUID NOT NULL,
    "usr_profile" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("usr_id")
);

-- CreateTable
CREATE TABLE "person" (
    "per_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "per_firstname" TEXT,
    "per_lastname" TEXT,
    "per_civility" "civility",
    "per_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "per_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("per_id")
);

-- CreateTable
CREATE TABLE "post" (
    "pst_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pst_title" TEXT NOT NULL,
    "pst_text" TEXT NOT NULL,
    "pst_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pst_updatedAt" TIMESTAMP(3) NOT NULL,
    "pst_person" UUID NOT NULL,
    "pst_picture" UUID,
    "pst_video" UUID,

    CONSTRAINT "post_pkey" PRIMARY KEY ("pst_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "cmt_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cmt_text" TEXT NOT NULL,
    "cmt_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cmt_updatedAt" TIMESTAMP(3) NOT NULL,
    "cmt_person" UUID NOT NULL,
    "cmt_comment" UUID NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("cmt_id")
);

-- CreateTable
CREATE TABLE "like_comment" (
    "lkc_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lke_comment" UUID NOT NULL,
    "lkc_person" UUID NOT NULL,

    CONSTRAINT "like_comment_pkey" PRIMARY KEY ("lkc_id")
);

-- CreateTable
CREATE TABLE "like_post" (
    "lkp_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lkp_post" UUID NOT NULL,
    "lkp_person" UUID NOT NULL,

    CONSTRAINT "like_post_pkey" PRIMARY KEY ("lkp_id")
);

-- CreateTable
CREATE TABLE "follow" (
    "flw_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "flw_followers" UUID,
    "flw_following" UUID,
    "flw_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flw_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("flw_id")
);

-- CreateTable
CREATE TABLE "profile" (
    "prf_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "prf_label" TEXT NOT NULL,
    "prf_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prf_updatedAt" TIMESTAMP(3) NOT NULL,
    "picturePct_id" UUID NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("prf_id")
);

-- CreateTable
CREATE TABLE "picture" (
    "pct_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pct_name" TEXT NOT NULL,
    "pct_path" TEXT NOT NULL,
    "pct_size" TEXT NOT NULL,
    "pct_type" TEXT NOT NULL,
    "pct_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pct_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("pct_id")
);

-- CreateTable
CREATE TABLE "video" (
    "vdo_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vdo_name" TEXT NOT NULL,
    "vdo_path" TEXT NOT NULL,
    "vdo_size" TEXT NOT NULL,
    "vdo_type" TEXT NOT NULL,
    "vdo_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vdo_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("vdo_id")
);

-- CreateTable
CREATE TABLE "category" (
    "ctg_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ctg_label" TEXT NOT NULL,
    "ctg_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ctg_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("ctg_id")
);

-- CreateTable
CREATE TABLE "post_category" (
    "pcg_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pcg_person" UUID NOT NULL,
    "pcg_category" UUID NOT NULL,

    CONSTRAINT "post_category_pkey" PRIMARY KEY ("pcg_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_usr_email_key" ON "users"("usr_email");

-- CreateIndex
CREATE UNIQUE INDEX "users_usr_person_key" ON "users"("usr_person");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_usr_profile_fkey" FOREIGN KEY ("usr_profile") REFERENCES "profile"("prf_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_usr_person_fkey" FOREIGN KEY ("usr_person") REFERENCES "person"("per_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_pst_person_fkey" FOREIGN KEY ("pst_person") REFERENCES "person"("per_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_pst_picture_fkey" FOREIGN KEY ("pst_picture") REFERENCES "picture"("pct_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_pst_video_fkey" FOREIGN KEY ("pst_video") REFERENCES "video"("vdo_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_cmt_person_fkey" FOREIGN KEY ("cmt_person") REFERENCES "person"("per_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_cmt_comment_fkey" FOREIGN KEY ("cmt_comment") REFERENCES "post"("pst_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_comment" ADD CONSTRAINT "like_comment_lke_comment_fkey" FOREIGN KEY ("lke_comment") REFERENCES "comment"("cmt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_comment" ADD CONSTRAINT "like_comment_lkc_person_fkey" FOREIGN KEY ("lkc_person") REFERENCES "person"("per_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_post" ADD CONSTRAINT "like_post_lkp_post_fkey" FOREIGN KEY ("lkp_post") REFERENCES "post"("pst_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_post" ADD CONSTRAINT "like_post_lkp_person_fkey" FOREIGN KEY ("lkp_person") REFERENCES "person"("per_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_flw_followers_fkey" FOREIGN KEY ("flw_followers") REFERENCES "person"("per_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_flw_following_fkey" FOREIGN KEY ("flw_following") REFERENCES "person"("per_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_picturePct_id_fkey" FOREIGN KEY ("picturePct_id") REFERENCES "picture"("pct_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_pcg_person_fkey" FOREIGN KEY ("pcg_person") REFERENCES "person"("per_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_pcg_category_fkey" FOREIGN KEY ("pcg_category") REFERENCES "category"("ctg_id") ON DELETE RESTRICT ON UPDATE CASCADE;
