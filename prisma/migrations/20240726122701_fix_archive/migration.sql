/*
  Warnings:

  - Added the required column `isReal` to the `Archive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Archive" ADD COLUMN     "isReal" BOOLEAN NOT NULL;
