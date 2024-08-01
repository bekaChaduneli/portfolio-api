/*
  Warnings:

  - You are about to drop the `ProfileWorks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileWorksTranslations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfileWorks" DROP CONSTRAINT "ProfileWorks_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileWorksTranslations" DROP CONSTRAINT "ProfileWorksTranslations_profileWorksId_fkey";

-- DropTable
DROP TABLE "ProfileWorks";

-- DropTable
DROP TABLE "ProfileWorksTranslations";
