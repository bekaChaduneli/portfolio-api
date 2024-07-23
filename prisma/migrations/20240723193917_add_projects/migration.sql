-- CreateTable
CREATE TABLE "MainProjects" (
    "id" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "mobileBackgrounds" TEXT[],
    "link" TEXT NOT NULL,
    "video" TEXT[],
    "images" TEXT[],
    "skills" TEXT[],
    "github" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MainProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainProjectsTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "mainProjectsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archiveId" TEXT,

    CONSTRAINT "MainProjectsTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archive" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Archive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchiveTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "archiveId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchiveTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MainProjectsTranslations_mainProjectsId_languageCode_key" ON "MainProjectsTranslations"("mainProjectsId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveTranslations_archiveId_languageCode_key" ON "ArchiveTranslations"("archiveId", "languageCode");

-- AddForeignKey
ALTER TABLE "MainProjectsTranslations" ADD CONSTRAINT "MainProjectsTranslations_mainProjectsId_fkey" FOREIGN KEY ("mainProjectsId") REFERENCES "MainProjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchiveTranslations" ADD CONSTRAINT "ArchiveTranslations_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
