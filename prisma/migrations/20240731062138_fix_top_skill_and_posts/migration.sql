/*
  Warnings:

  - You are about to drop the column `linkedinName` on the `PostsTranslations` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinName` on the `TopSkillsTranslations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostsTranslations" DROP COLUMN "linkedinName";

-- AlterTable
ALTER TABLE "TopSkillsTranslations" DROP COLUMN "linkedinName";
