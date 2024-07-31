/*
  Warnings:

  - You are about to drop the column `profileTranslationsId` on the `Hobbys` table. All the data in the column will be lost.
  - You are about to drop the column `profileTranslationsId` on the `ProfileWorks` table. All the data in the column will be lost.
  - You are about to drop the column `profileTranslationsId` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Hobbys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `ProfileWorks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hobbys" DROP CONSTRAINT "Hobbys_profileTranslationsId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileWorks" DROP CONSTRAINT "ProfileWorks_profileTranslationsId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_profileTranslationsId_fkey";

-- DropIndex
DROP INDEX "Hobbys_profileTranslationsId_key";

-- DropIndex
DROP INDEX "ProfileWorks_profileTranslationsId_key";

-- DropIndex
DROP INDEX "Questions_profileTranslationsId_key";

-- AlterTable
ALTER TABLE "Hobbys" DROP COLUMN "profileTranslationsId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfileWorks" DROP COLUMN "profileTranslationsId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "profileTranslationsId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hobbys" ADD CONSTRAINT "Hobbys_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileWorks" ADD CONSTRAINT "ProfileWorks_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
