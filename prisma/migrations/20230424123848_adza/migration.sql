-- AlterTable
ALTER TABLE "picture" ALTER COLUMN "pct_name" DROP NOT NULL,
ALTER COLUMN "pct_path" DROP NOT NULL,
ALTER COLUMN "pct_type" DROP NOT NULL,
ALTER COLUMN "pct_updatedAt" DROP NOT NULL;
