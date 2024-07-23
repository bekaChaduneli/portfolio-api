-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogsTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "blogsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogsTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogsTranslations_blogsId_languageCode_key" ON "BlogsTranslations"("blogsId", "languageCode");

-- AddForeignKey
ALTER TABLE "BlogsTranslations" ADD CONSTRAINT "BlogsTranslations_blogsId_fkey" FOREIGN KEY ("blogsId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
