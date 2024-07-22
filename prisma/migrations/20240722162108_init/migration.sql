/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `personalId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
COMMIT;

-- DropIndex
DROP INDEX "User_personalId_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "isVerified",
DROP COLUMN "name",
DROP COLUMN "personalId",
DROP COLUMN "phone",
DROP COLUMN "picture",
DROP COLUMN "updatedAt",
DROP COLUMN "verificationCode",
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "pages" TEXT NOT NULL,
    "readedPages" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BooksTranslations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "booksId" TEXT,

    CONSTRAINT "BooksTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubRepos" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "stars" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "GithubRepos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubReposTranslations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "githubReposId" TEXT,

    CONSTRAINT "GithubReposTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Linkedin" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Linkedin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkedinTranslations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "linkedinId" TEXT,

    CONSTRAINT "LinkedinTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "linkedinId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,
    "likes" TEXT NOT NULL,
    "commentsSum" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsTranslations" (
    "id" TEXT NOT NULL,
    "linkedinName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postsId" TEXT,

    CONSTRAINT "PostsTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopSkills" (
    "id" TEXT NOT NULL,
    "linkedinId" TEXT,

    CONSTRAINT "TopSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopSkillsTranslations" (
    "id" TEXT NOT NULL,
    "linkedinName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "topSkillsId" TEXT,

    CONSTRAINT "TopSkillsTranslations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BooksTranslations" ADD CONSTRAINT "BooksTranslations_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubReposTranslations" ADD CONSTRAINT "GithubReposTranslations_githubReposId_fkey" FOREIGN KEY ("githubReposId") REFERENCES "GithubRepos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedinTranslations" ADD CONSTRAINT "LinkedinTranslations_linkedinId_fkey" FOREIGN KEY ("linkedinId") REFERENCES "Linkedin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_linkedinId_fkey" FOREIGN KEY ("linkedinId") REFERENCES "Linkedin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsTranslations" ADD CONSTRAINT "PostsTranslations_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopSkills" ADD CONSTRAINT "TopSkills_linkedinId_fkey" FOREIGN KEY ("linkedinId") REFERENCES "Linkedin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopSkillsTranslations" ADD CONSTRAINT "TopSkillsTranslations_topSkillsId_fkey" FOREIGN KEY ("topSkillsId") REFERENCES "TopSkills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
