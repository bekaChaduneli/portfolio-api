/*
  Warnings:

  - Changed the type of `experience` on the `AboutMe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `age` on the `AboutMe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projectNum` on the `AboutMe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AboutMe" DROP COLUMN "experience",
ADD COLUMN     "experience" INTEGER NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL,
DROP COLUMN "projectNum",
ADD COLUMN     "projectNum" INTEGER NOT NULL;
