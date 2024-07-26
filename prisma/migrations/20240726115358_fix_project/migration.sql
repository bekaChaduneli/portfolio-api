/*
  Warnings:

  - Added the required column `isReal` to the `MainProjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MainProjects" ADD COLUMN     "isReal" BOOLEAN NOT NULL;
