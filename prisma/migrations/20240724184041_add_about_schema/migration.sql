/*
  Warnings:

  - Added the required column `type` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AboutMe" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "projectNum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AboutMe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutMeTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "aboutMeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AboutMeTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Works" (
    "id" TEXT NOT NULL,
    "aboutMeId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorksTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "worksId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorksTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Educations" (
    "id" TEXT NOT NULL,
    "aboutMeId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationsTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "educationsId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "gpa" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EducationsTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" TEXT NOT NULL,
    "aboutMeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguagesTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "languagesId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LanguagesTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificates" (
    "id" TEXT NOT NULL,
    "aboutMeId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificatesTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "certificatesId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organiation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CertificatesTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AboutMeTranslations_aboutMeId_languageCode_key" ON "AboutMeTranslations"("aboutMeId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Works_aboutMeId_key" ON "Works"("aboutMeId");

-- CreateIndex
CREATE UNIQUE INDEX "WorksTranslations_worksId_languageCode_key" ON "WorksTranslations"("worksId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Educations_aboutMeId_key" ON "Educations"("aboutMeId");

-- CreateIndex
CREATE UNIQUE INDEX "EducationsTranslations_educationsId_languageCode_key" ON "EducationsTranslations"("educationsId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Languages_aboutMeId_key" ON "Languages"("aboutMeId");

-- CreateIndex
CREATE UNIQUE INDEX "LanguagesTranslations_languagesId_languageCode_key" ON "LanguagesTranslations"("languagesId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Certificates_aboutMeId_key" ON "Certificates"("aboutMeId");

-- CreateIndex
CREATE UNIQUE INDEX "CertificatesTranslations_certificatesId_languageCode_key" ON "CertificatesTranslations"("certificatesId", "languageCode");

-- AddForeignKey
ALTER TABLE "AboutMeTranslations" ADD CONSTRAINT "AboutMeTranslations_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorksTranslations" ADD CONSTRAINT "WorksTranslations_worksId_fkey" FOREIGN KEY ("worksId") REFERENCES "Works"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Educations" ADD CONSTRAINT "Educations_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationsTranslations" ADD CONSTRAINT "EducationsTranslations_educationsId_fkey" FOREIGN KEY ("educationsId") REFERENCES "Educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguagesTranslations" ADD CONSTRAINT "LanguagesTranslations_languagesId_fkey" FOREIGN KEY ("languagesId") REFERENCES "Languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificatesTranslations" ADD CONSTRAINT "CertificatesTranslations_certificatesId_fkey" FOREIGN KEY ("certificatesId") REFERENCES "Certificates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
