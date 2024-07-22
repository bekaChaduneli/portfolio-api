/*
  Warnings:

  - A unique constraint covering the columns `[booksId,languageCode]` on the table `BooksTranslations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[githubReposId,languageCode]` on the table `GithubReposTranslations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileTranslationsId]` on the table `Hobbys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hobbysId,languageCode]` on the table `HobbysTranslations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkedinId,languageCode]` on the table `LinkedinTranslations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkedinId]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postsId,languageCode]` on the table `PostsTranslations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId,languageCode]` on the table `ProfileTranslations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileTranslationsId]` on the table `ProfileWorks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileWorksId,languageCode]` on the table `ProfileWorksTranslations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileTranslationsId]` on the table `Questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionsId,languageCode]` on the table `QuestionsTranslations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Socials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkedinId]` on the table `TopSkills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topSkillsId,languageCode]` on the table `TopSkillsTranslations` will be added. If there are existing duplicate values, this will fail.
  - Made the column `booksId` on table `BooksTranslations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubReposId` on table `GithubReposTranslations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileTranslationsId` on table `Hobbys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hobbysId` on table `HobbysTranslations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedinId` on table `LinkedinTranslations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedinId` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postsId` on table `PostsTranslations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileId` on table `ProfileTranslations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileTranslationsId` on table `ProfileWorks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileWorksId` on table `ProfileWorksTranslations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileTranslationsId` on table `Questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questionsId` on table `QuestionsTranslations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileId` on table `Socials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedinId` on table `TopSkills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topSkillsId` on table `TopSkillsTranslations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Hobbys" DROP CONSTRAINT "Hobbys_profileTranslationsId_fkey";

-- DropForeignKey
ALTER TABLE "HobbysTranslations" DROP CONSTRAINT "HobbysTranslations_hobbysId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileTranslations" DROP CONSTRAINT "ProfileTranslations_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileWorks" DROP CONSTRAINT "ProfileWorks_profileTranslationsId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileWorksTranslations" DROP CONSTRAINT "ProfileWorksTranslations_profileWorksId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_profileTranslationsId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionsTranslations" DROP CONSTRAINT "QuestionsTranslations_questionsId_fkey";

-- DropForeignKey
ALTER TABLE "Socials" DROP CONSTRAINT "Socials_profileId_fkey";

-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "image" DROP DEFAULT,
ALTER COLUMN "releaseDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BooksTranslations" ALTER COLUMN "booksId" SET NOT NULL;

-- AlterTable
ALTER TABLE "GithubReposTranslations" ALTER COLUMN "githubReposId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Hobbys" ALTER COLUMN "profileTranslationsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "HobbysTranslations" ALTER COLUMN "hobbysId" SET NOT NULL;

-- AlterTable
ALTER TABLE "LinkedinTranslations" ALTER COLUMN "linkedinId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "linkedinId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PostsTranslations" ALTER COLUMN "postsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProfileTranslations" ALTER COLUMN "profileId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProfileWorks" ALTER COLUMN "profileTranslationsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProfileWorksTranslations" ALTER COLUMN "profileWorksId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "profileTranslationsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "QuestionsTranslations" ALTER COLUMN "questionsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Socials" ALTER COLUMN "profileId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TopSkills" ALTER COLUMN "linkedinId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TopSkillsTranslations" ALTER COLUMN "topSkillsId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BooksTranslations_booksId_languageCode_key" ON "BooksTranslations"("booksId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "GithubReposTranslations_githubReposId_languageCode_key" ON "GithubReposTranslations"("githubReposId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Hobbys_profileTranslationsId_key" ON "Hobbys"("profileTranslationsId");

-- CreateIndex
CREATE UNIQUE INDEX "HobbysTranslations_hobbysId_languageCode_key" ON "HobbysTranslations"("hobbysId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinTranslations_linkedinId_languageCode_key" ON "LinkedinTranslations"("linkedinId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_linkedinId_key" ON "Posts"("linkedinId");

-- CreateIndex
CREATE UNIQUE INDEX "PostsTranslations_postsId_languageCode_key" ON "PostsTranslations"("postsId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileTranslations_profileId_languageCode_key" ON "ProfileTranslations"("profileId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileWorks_profileTranslationsId_key" ON "ProfileWorks"("profileTranslationsId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileWorksTranslations_profileWorksId_languageCode_key" ON "ProfileWorksTranslations"("profileWorksId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_profileTranslationsId_key" ON "Questions"("profileTranslationsId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsTranslations_questionsId_languageCode_key" ON "QuestionsTranslations"("questionsId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Socials_profileId_key" ON "Socials"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "TopSkills_linkedinId_key" ON "TopSkills"("linkedinId");

-- CreateIndex
CREATE UNIQUE INDEX "TopSkillsTranslations_topSkillsId_languageCode_key" ON "TopSkillsTranslations"("topSkillsId", "languageCode");

-- AddForeignKey
ALTER TABLE "ProfileTranslations" ADD CONSTRAINT "ProfileTranslations_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_profileTranslationsId_fkey" FOREIGN KEY ("profileTranslationsId") REFERENCES "ProfileTranslations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsTranslations" ADD CONSTRAINT "QuestionsTranslations_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hobbys" ADD CONSTRAINT "Hobbys_profileTranslationsId_fkey" FOREIGN KEY ("profileTranslationsId") REFERENCES "ProfileTranslations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbysTranslations" ADD CONSTRAINT "HobbysTranslations_hobbysId_fkey" FOREIGN KEY ("hobbysId") REFERENCES "Hobbys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileWorks" ADD CONSTRAINT "ProfileWorks_profileTranslationsId_fkey" FOREIGN KEY ("profileTranslationsId") REFERENCES "ProfileTranslations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileWorksTranslations" ADD CONSTRAINT "ProfileWorksTranslations_profileWorksId_fkey" FOREIGN KEY ("profileWorksId") REFERENCES "ProfileWorks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
