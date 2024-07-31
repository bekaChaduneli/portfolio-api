/*
  Warnings:

  - Changed the type of `likes` on the `Posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `commentsSum` on the `Posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER NOT NULL,
DROP COLUMN "commentsSum",
ADD COLUMN     "commentsSum" INTEGER NOT NULL;
