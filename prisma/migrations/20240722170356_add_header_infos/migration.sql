-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileTranslations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "universityAbout" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "profileId" TEXT,

    CONSTRAINT "ProfileTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "profileTranslationsId" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobbys" (
    "id" TEXT NOT NULL,
    "profileTranslationsId" TEXT,
    "hobby" TEXT NOT NULL,
    "aboutHobby" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Hobbys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileWorks" (
    "id" TEXT NOT NULL,
    "work" TEXT NOT NULL,
    "workLogo" TEXT NOT NULL,
    "workAbout" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "fromDate" TEXT NOT NULL,
    "toDate" TEXT NOT NULL,
    "profileTranslationsId" TEXT,

    CONSTRAINT "ProfileWorks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Socials" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Socials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileTranslations" ADD CONSTRAINT "ProfileTranslations_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_profileTranslationsId_fkey" FOREIGN KEY ("profileTranslationsId") REFERENCES "ProfileTranslations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hobbys" ADD CONSTRAINT "Hobbys_profileTranslationsId_fkey" FOREIGN KEY ("profileTranslationsId") REFERENCES "ProfileTranslations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileWorks" ADD CONSTRAINT "ProfileWorks_profileTranslationsId_fkey" FOREIGN KEY ("profileTranslationsId") REFERENCES "ProfileTranslations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
