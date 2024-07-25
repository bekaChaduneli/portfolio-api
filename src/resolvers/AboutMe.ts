import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  ObjectType,
  Field,
  InputType,
  Query,
} from "type-graphql";
import { Context } from "..";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

// Input Types
@InputType()
class CreateAboutMeInput {
  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  experience?: string;

  @Field(() => String, { nullable: true })
  age?: string;

  @Field(() => String, { nullable: true })
  projectNum?: string;

  @Field(() => [CreateAboutMeTranslationInput], { nullable: true })
  translations?: CreateAboutMeTranslationInput[];

  @Field(() => [CreateWorkInput], { nullable: true })
  works?: CreateWorkInput[];

  @Field(() => [CreateEducationInput], { nullable: true })
  education?: CreateEducationInput[];

  @Field(() => [CreateLanguageInput], { nullable: true })
  languages?: CreateLanguageInput[];

  @Field(() => [CreateCertificateInput], { nullable: true })
  certificates?: CreateCertificateInput[];
}

@InputType()
class CreateAboutMeTranslationInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class CreateWorkInput {
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => Date, { nullable: true })
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  toDate?: Date;

  @Field(() => [CreateWorkTranslationInput], { nullable: true })
  translations?: CreateWorkTranslationInput[];
}

@InputType()
class CreateWorkTranslationInput {
  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  locationType?: string;

  @Field(() => String, { nullable: true })
  employmentType?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class CreateEducationInput {
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => Date, { nullable: true })
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  toDate?: Date;

  @Field(() => [CreateEducationTranslationInput], { nullable: true })
  translations?: CreateEducationTranslationInput[];
}

@InputType()
class CreateEducationTranslationInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  degree?: string;

  @Field(() => String, { nullable: true })
  fieldOfStudy?: string;

  @Field(() => String, { nullable: true })
  gpa?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class CreateLanguageInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => [CreateLanguageTranslationInput], { nullable: true })
  translations?: CreateLanguageTranslationInput[];
}

@InputType()
class CreateLanguageTranslationInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class CreateCertificateInput {
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Date, { nullable: true })
  issueDate?: Date;

  @Field(() => String, { nullable: true })
  expirationDate?: string;

  @Field(() => [CreateCertificateTranslationInput], { nullable: true })
  translations?: CreateCertificateTranslationInput[];
}

@InputType()
class CreateCertificateTranslationInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  organization?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

// Update Input Types
@InputType()
class UpdateAboutMeInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  experience?: string;

  @Field(() => String, { nullable: true })
  age?: string;

  @Field(() => String, { nullable: true })
  projectNum?: string;

  @Field(() => [UpdateAboutMeTranslationInput], { nullable: true })
  translations?: UpdateAboutMeTranslationInput[];

  @Field(() => [UpdateWorkInput], { nullable: true })
  works?: UpdateWorkInput[];

  @Field(() => [UpdateEducationInput], { nullable: true })
  education?: UpdateEducationInput[];

  @Field(() => [UpdateLanguageInput], { nullable: true })
  languages?: UpdateLanguageInput[];

  @Field(() => [UpdateCertificateInput], { nullable: true })
  certificates?: UpdateCertificateInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
class UpdateAboutMeTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateWorkInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => Date, { nullable: true })
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  toDate?: Date;

  @Field(() => [UpdateWorkTranslationInput], { nullable: true })
  translations?: UpdateWorkTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
class UpdateWorkTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  locationType?: string;

  @Field(() => String, { nullable: true })
  employmentType?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateEducationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => Date, { nullable: true })
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  toDate?: Date;

  @Field(() => [UpdateEducationTranslationInput], { nullable: true })
  translations?: UpdateEducationTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
class UpdateEducationTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  degree?: string;

  @Field(() => String, { nullable: true })
  fieldOfStudy?: string;

  @Field(() => String, { nullable: true })
  gpa?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateLanguageInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => [UpdateLanguageTranslationInput], { nullable: true })
  translations?: UpdateLanguageTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
class UpdateLanguageTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
export class UpdateCertificateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Date, { nullable: true })
  issueDate?: Date;

  @Field(() => String, { nullable: true })
  expirationDate?: string;

  @Field(() => [UpdateCertificateTranslationInput], { nullable: true })
  translations?: UpdateCertificateTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
export class UpdateCertificateTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  organization?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

// Object Types
@ObjectType()
class AboutMe {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  experience?: string;

  @Field(() => String, { nullable: true })
  age?: string;

  @Field(() => String, { nullable: true })
  projectNum?: string;

  @Field(() => [AboutMeTranslation], { nullable: true })
  translations?: AboutMeTranslation[];

  @Field(() => [Work], { nullable: true })
  works?: Work[];

  @Field(() => [Education], { nullable: true })
  education?: Education[];

  @Field(() => [Language], { nullable: true })
  languages?: Language[];

  @Field(() => [Certificate], { nullable: true })
  certificates?: Certificate[];
}

@ObjectType()
class AboutMeTranslation {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
class Work {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => Date, { nullable: true })
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  toDate?: Date;

  @Field(() => [WorkTranslation], { nullable: true })
  translations?: WorkTranslation[];
}

@ObjectType()
class WorkTranslation {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  locationType?: string;

  @Field(() => String, { nullable: true })
  employmentType?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
class Education {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => Date, { nullable: true })
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  toDate?: Date;

  @Field(() => [EducationTranslation], { nullable: true })
  translations?: EducationTranslation[];
}

@ObjectType()
class EducationTranslation {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  degree?: string;

  @Field(() => String, { nullable: true })
  fieldOfStudy?: string;

  @Field(() => String, { nullable: true })
  gpa?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
class Language {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => [LanguageTranslation], { nullable: true })
  translations?: LanguageTranslation[];
}

@ObjectType()
class LanguageTranslation {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
export class Certificate {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Date, { nullable: true })
  issueDate?: Date;

  @Field(() => String, { nullable: true })
  expirationDate?: string;

  @Field(() => [CertificateTranslation], { nullable: true })
  translations?: CertificateTranslation[];
}

@ObjectType()
export class CertificateTranslation {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  organization?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@Resolver(() => AboutMe)
export class AboutMeResolver {
  @Mutation(() => AboutMe)
  async createAboutMe(
    @Arg("data") data: CreateAboutMeInput,
    @Ctx() ctx: Context
  ): Promise<AboutMe> {
    return ctx.prisma.aboutMe.create({
      data: {
        image: data.image || "",
        experience: data.experience || "",
        age: data.age || "",
        projectNum: data.projectNum || "",
        translations: {
          create:
            data.translations?.map((translation) => ({
              id: uuidv4(),
              name: translation.name || "",
              about: translation.about || "",
              role: translation.role || "",
              country: translation.country || "",
              city: translation.city || "",
              languageCode: translation.languageCode || "",
            })) || [],
        },
        works: {
          create:
            data.works?.map((work) => ({
              id: uuidv4(),
              link: work.link || "",
              fromDate: work.fromDate || new Date(),
              toDate: work.toDate || new Date(),
              translations: {
                create:
                  work.translations?.map((translation) => ({
                    id: uuidv4(),
                    company: translation.company || "",
                    role: translation.role || "",
                    description: translation.description || "",
                    location: translation.location || "",
                    locationType: translation.locationType || "",
                    employmentType: translation.employmentType || "",
                    languageCode: translation.languageCode || "",
                  })) || [],
              },
            })) || [],
        },
        education: {
          create:
            data.education?.map((education) => ({
              id: uuidv4(),
              link: education.link || "",
              fromDate: education.fromDate || new Date(),
              toDate: education.toDate || new Date(),
              translations: {
                create:
                  education.translations?.map((translation) => ({
                    id: uuidv4(),
                    name: translation.name || "",
                    degree: translation.degree || "",
                    fieldOfStudy: translation.fieldOfStudy || "",
                    gpa: translation.gpa || "",
                    description: translation.description || "",
                    languageCode: translation.languageCode || "",
                  })) || [],
              },
            })) || [],
        },
        languages: {
          create:
            data.languages?.map((language) => ({
              id: uuidv4(),
              name: language.name || "",
              description: language.description || "",
              level: language.level || "",
              translations: {
                create:
                  language.translations?.map((translation) => ({
                    id: uuidv4(),
                    name: translation.name || "",
                    description: translation.description || "",
                    level: translation.level || "",
                    languageCode: translation.languageCode || "",
                  })) || [],
              },
            })) || [],
        },
        certificates: {
          create:
            data.certificates?.map((certificate) => ({
              id: uuidv4(),
              link: certificate.link || "",
              image: certificate.image || "",
              issueDate: certificate.issueDate || new Date(),
              expirationDate: certificate.expirationDate || new Date(),
              translations: {
                create:
                  certificate.translations?.map((translation) => ({
                    id: uuidv4(),
                    name: translation.name || "",
                    organization: translation.organization || "",
                    description: translation.description || "",
                    languageCode: translation.languageCode || "",
                  })) || [],
              },
            })) || [],
        },
      },
    });
  }

  @Mutation(() => AboutMe)
  async updateAboutMe(
    @Arg("data") data: UpdateAboutMeInput,
    @Ctx() ctx: Context
  ): Promise<AboutMe> {
    return ctx.prisma.aboutMe.update({
      where: { id: data.id },
      data: {
        image: data.image || undefined,
        experience: data.experience || undefined,
        age: data.age || undefined,
        projectNum: data.projectNum || undefined,
        translations: {
          upsert:
            data.translations?.map((translation) => ({
              where: { id: translation.id! },
              update: {
                name: translation.name || undefined,
                about: translation.about || undefined,
                role: translation.role || undefined,
                country: translation.country || undefined,
                city: translation.city || undefined,
                languageCode: translation.languageCode || undefined,
              },
              create: {
                id: uuidv4(),
                name: translation.name || "",
                about: translation.about || "",
                role: translation.role || "",
                country: translation.country || "",
                city: translation.city || "",
                languageCode: translation.languageCode || "",
              },
            })) || [],
        },
        works: {
          upsert:
            data.works?.map((work) => ({
              where: { id: work.id! },
              update: {
                link: work.link || undefined,
                fromDate: work.fromDate || undefined,
                toDate: work.toDate || undefined,
                translations: {
                  upsert:
                    work.translations?.map((translation) => ({
                      where: { id: translation.id! },
                      update: {
                        company: translation.company || undefined,
                        role: translation.role || undefined,
                        description: translation.description || undefined,
                        location: translation.location || undefined,
                        locationType: translation.locationType || undefined,
                        employmentType: translation.employmentType || undefined,
                        languageCode: translation.languageCode || undefined,
                      },
                      create: {
                        id: uuidv4(),
                        company: translation.company || "",
                        role: translation.role || "",
                        description: translation.description || "",
                        location: translation.location || "",
                        locationType: translation.locationType || "",
                        employmentType: translation.employmentType || "",
                        languageCode: translation.languageCode || "",
                      },
                    })) || [],
                },
              },
              create: {
                id: uuidv4(),
                link: work.link || "",
                fromDate: work.fromDate || new Date(),
                toDate: work.toDate || new Date(),
                translations: {
                  create:
                    work.translations?.map((translation) => ({
                      id: uuidv4(),
                      company: translation.company || "",
                      role: translation.role || "",
                      description: translation.description || "",
                      location: translation.location || "",
                      locationType: translation.locationType || "",
                      employmentType: translation.employmentType || "",
                      languageCode: translation.languageCode || "",
                    })) || [],
                },
              },
            })) || [],
        },
        education: {
          upsert:
            data.education?.map((education) => ({
              where: { id: education.id! },
              update: {
                link: education.link || undefined,
                fromDate: education.fromDate || undefined,
                toDate: education.toDate || undefined,
                translations: {
                  upsert:
                    education.translations?.map((translation) => ({
                      where: { id: translation.id! },
                      update: {
                        name: translation.name || undefined,
                        degree: translation.degree || undefined,
                        fieldOfStudy: translation.fieldOfStudy || undefined,
                        gpa: translation.gpa || undefined,
                        description: translation.description || undefined,
                        languageCode: translation.languageCode || undefined,
                      },
                      create: {
                        id: uuidv4(),
                        name: translation.name || "",
                        degree: translation.degree || "",
                        fieldOfStudy: translation.fieldOfStudy || "",
                        gpa: translation.gpa || "",
                        description: translation.description || "",
                        languageCode: translation.languageCode || "",
                      },
                    })) || [],
                },
              },
              create: {
                id: uuidv4(),
                link: education.link || "",
                fromDate: education.fromDate || new Date(),
                toDate: education.toDate || new Date(),
                translations: {
                  create:
                    education.translations?.map((translation) => ({
                      id: uuidv4(),
                      name: translation.name || "",
                      degree: translation.degree || "",
                      fieldOfStudy: translation.fieldOfStudy || "",
                      gpa: translation.gpa || "",
                      description: translation.description || "",
                      languageCode: translation.languageCode || "",
                    })) || [],
                },
              },
            })) || [],
        },
        languages: {
          upsert:
            data.languages?.map((language) => ({
              where: { id: language.id! },
              update: {
                name: language.name || undefined,
                description: language.description || undefined,
                level: language.level || undefined,
                translations: {
                  upsert:
                    language.translations?.map((translation) => ({
                      where: { id: translation.id! },
                      update: {
                        name: translation.name || undefined,
                        description: translation.description || undefined,
                        level: translation.level || undefined,
                        languageCode: translation.languageCode || undefined,
                      },
                      create: {
                        id: uuidv4(),
                        name: translation.name || "",
                        description: translation.description || "",
                        level: translation.level || "",
                        languageCode: translation.languageCode || "",
                      },
                    })) || [],
                },
              },
              create: {
                id: uuidv4(),
                name: language.name || "",
                description: language.description || "",
                level: language.level || "",
                translations: {
                  create:
                    language.translations?.map((translation) => ({
                      id: uuidv4(),
                      name: translation.name || "",
                      description: translation.description || "",
                      level: translation.level || "",
                      languageCode: translation.languageCode || "",
                    })) || [],
                },
              },
            })) || [],
        },
        certificates: {
          upsert:
            data.certificates?.map((certificate) => ({
              where: { id: certificate.id! },
              update: {
                link: certificate.link || undefined,
                image: certificate.image || undefined,
                issueDate: certificate.issueDate || undefined,
                expirationDate: certificate.expirationDate || undefined,
                translations: {
                  upsert:
                    certificate.translations?.map((translation) => ({
                      where: { id: translation.id! },
                      update: {
                        name: translation.name || undefined,
                        organization: translation.organization || undefined,
                        description: translation.description || undefined,
                        languageCode: translation.languageCode || undefined,
                      },
                      create: {
                        id: uuidv4(),
                        name: translation.name || "",
                        organization: translation.organization || "",
                        description: translation.description || "",
                        languageCode: translation.languageCode || "",
                      },
                    })) || [],
                },
              },
              create: {
                id: uuidv4(),
                link: certificate.link || "",
                image: certificate.image || "",
                issueDate: certificate.issueDate || new Date(),
                expirationDate: certificate.expirationDate || new Date(),
                translations: {
                  create:
                    certificate.translations?.map((translation) => ({
                      id: uuidv4(),
                      name: translation.name || "",
                      organization: translation.organization || "",
                      description: translation.description || "",
                      languageCode: translation.languageCode || "",
                    })) || [],
                },
              },
            })) || [],
        },
      },
    });
  }

  @Query(() => AboutMe, { nullable: true })
  async getAboutMe(@Ctx() ctx: Context): Promise<AboutMe | null> {
    return await ctx.prisma.aboutMe.findFirst();
  }
}
