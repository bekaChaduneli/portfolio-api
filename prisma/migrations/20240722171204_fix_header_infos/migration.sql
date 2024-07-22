/*
  Warnings:

  - You are about to drop the column `aboutHobby` on the `Hobbys` table. All the data in the column will be lost.
  - You are about to drop the column `hobby` on the `Hobbys` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `ProfileWorks` table. All the data in the column will be lost.
  - You are about to drop the column `work` on the `ProfileWorks` table. All the data in the column will be lost.
  - You are about to drop the column `workAbout` on the `ProfileWorks` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `languageCode` to the `BooksTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `GithubReposTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `LinkedinTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `PostsTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `ProfileTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `TopSkillsTranslations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BooksTranslations" ADD COLUMN     "languageCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GithubReposTranslations" ADD COLUMN     "languageCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hobbys" DROP COLUMN "aboutHobby",
DROP COLUMN "hobby";

-- AlterTable
ALTER TABLE "LinkedinTranslations" ADD COLUMN     "languageCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostsTranslations" ADD COLUMN     "languageCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfileTranslations" ADD COLUMN     "languageCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfileWorks" DROP COLUMN "position",
DROP COLUMN "work",
DROP COLUMN "workAbout";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "answer",
DROP COLUMN "question";

-- AlterTable
ALTER TABLE "TopSkillsTranslations" ADD COLUMN     "languageCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "QuestionsTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "questionsId" TEXT,

    CONSTRAINT "QuestionsTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HobbysTranslations" (
    "id" TEXT NOT NULL,
    "hobby" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "aboutHobby" TEXT NOT NULL,
    "hobbysId" TEXT,

    CONSTRAINT "HobbysTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileWorksTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "profileWorksId" TEXT,
    "work" TEXT NOT NULL,
    "workAbout" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "ProfileWorksTranslations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionsTranslations" ADD CONSTRAINT "QuestionsTranslations_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbysTranslations" ADD CONSTRAINT "HobbysTranslations_hobbysId_fkey" FOREIGN KEY ("hobbysId") REFERENCES "Hobbys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileWorksTranslations" ADD CONSTRAINT "ProfileWorksTranslations_profileWorksId_fkey" FOREIGN KEY ("profileWorksId") REFERENCES "ProfileWorks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
