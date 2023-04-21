-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_usr_person_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "usr_person" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_usr_person_fkey" FOREIGN KEY ("usr_person") REFERENCES "person"("per_id") ON DELETE SET NULL ON UPDATE CASCADE;
