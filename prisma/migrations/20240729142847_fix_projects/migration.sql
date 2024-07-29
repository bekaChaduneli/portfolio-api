/*
  Warnings:

  - Added the required column `markdown` to the `ArchiveTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `markdown` to the `MainProjectsTranslations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArchiveTranslations" ADD COLUMN     "markdown" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MainProjectsTranslations" ADD COLUMN     "markdown" TEXT NOT NULL;
