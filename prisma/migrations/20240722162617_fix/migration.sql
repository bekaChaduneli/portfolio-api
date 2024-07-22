/*
  Warnings:

  - Added the required column `finished` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "finished" BOOLEAN NOT NULL;
