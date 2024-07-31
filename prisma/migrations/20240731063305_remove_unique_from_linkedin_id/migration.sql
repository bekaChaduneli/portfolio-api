/*
  Warnings:

  - A unique constraint covering the columns `[languageCode]` on the table `LinkedinTranslations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LinkedinTranslations_linkedinId_languageCode_key";

-- DropIndex
DROP INDEX "Posts_linkedinId_key";

-- DropIndex
DROP INDEX "TopSkills_linkedinId_key";

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinTranslations_languageCode_key" ON "LinkedinTranslations"("languageCode");
