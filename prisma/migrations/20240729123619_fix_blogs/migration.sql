/*
  Warnings:

  - Added the required column `markdown` to the `BlogsTranslations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogsTranslations" ADD COLUMN     "markdown" TEXT NOT NULL;
