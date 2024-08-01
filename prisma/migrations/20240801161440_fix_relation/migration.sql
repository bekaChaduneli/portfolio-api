-- DropForeignKey
ALTER TABLE "Certificates" DROP CONSTRAINT "Certificates_aboutMeId_fkey";

-- DropForeignKey
ALTER TABLE "Educations" DROP CONSTRAINT "Educations_aboutMeId_fkey";

-- DropForeignKey
ALTER TABLE "Languages" DROP CONSTRAINT "Languages_aboutMeId_fkey";

-- DropForeignKey
ALTER TABLE "Socials" DROP CONSTRAINT "Socials_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Works" DROP CONSTRAINT "Works_aboutMeId_fkey";

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Educations" ADD CONSTRAINT "Educations_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "AboutMe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
