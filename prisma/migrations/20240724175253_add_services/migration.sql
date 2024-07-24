-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicesTranslations" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "servicesId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServicesTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicesTranslations_servicesId_languageCode_key" ON "ServicesTranslations"("servicesId", "languageCode");

-- AddForeignKey
ALTER TABLE "ServicesTranslations" ADD CONSTRAINT "ServicesTranslations_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
