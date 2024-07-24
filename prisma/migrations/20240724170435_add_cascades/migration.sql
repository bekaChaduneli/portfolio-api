-- DropForeignKey
ALTER TABLE "ArchiveTranslations" DROP CONSTRAINT "ArchiveTranslations_archiveId_fkey";

-- DropForeignKey
ALTER TABLE "BlogsTranslations" DROP CONSTRAINT "BlogsTranslations_blogsId_fkey";

-- DropForeignKey
ALTER TABLE "HobbysTranslations" DROP CONSTRAINT "HobbysTranslations_hobbysId_fkey";

-- DropForeignKey
ALTER TABLE "MainProjectsTranslations" DROP CONSTRAINT "MainProjectsTranslations_mainProjectsId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileWorksTranslations" DROP CONSTRAINT "ProfileWorksTranslations_profileWorksId_fkey";

-- DropForeignKey
ALTER TABLE "SkillsTranslations" DROP CONSTRAINT "SkillsTranslations_skillsId_fkey";

-- AddForeignKey
ALTER TABLE "HobbysTranslations" ADD CONSTRAINT "HobbysTranslations_hobbysId_fkey" FOREIGN KEY ("hobbysId") REFERENCES "Hobbys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileWorksTranslations" ADD CONSTRAINT "ProfileWorksTranslations_profileWorksId_fkey" FOREIGN KEY ("profileWorksId") REFERENCES "ProfileWorks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainProjectsTranslations" ADD CONSTRAINT "MainProjectsTranslations_mainProjectsId_fkey" FOREIGN KEY ("mainProjectsId") REFERENCES "MainProjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchiveTranslations" ADD CONSTRAINT "ArchiveTranslations_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsTranslations" ADD CONSTRAINT "SkillsTranslations_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogsTranslations" ADD CONSTRAINT "BlogsTranslations_blogsId_fkey" FOREIGN KEY ("blogsId") REFERENCES "Blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
