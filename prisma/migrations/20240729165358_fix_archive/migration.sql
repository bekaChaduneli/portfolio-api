/*
  Warnings:

  - You are about to drop the column `markdown` on the `ArchiveTranslations` table. All the data in the column will be lost.
  - You are about to drop the column `archiveId` on the `MainProjectsTranslations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArchiveTranslations" DROP COLUMN "markdown";

-- AlterTable
ALTER TABLE "MainProjectsTranslations" DROP COLUMN "archiveId";
