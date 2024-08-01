import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  ObjectType,
  Query,
  Field,
  InputType,
} from "type-graphql";
import { Context } from "..";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@InputType()
class CreateAboutMeInput {
  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Number, { nullable: true })
  experience?: number;

  @Field(() => Number, { nullable: true })
  age?: number;

  @Field(() => Number, { nullable: true })
  projectNum?: number;

  @Field(() => [WorkInput], { nullable: true })
  works?: WorkInput[];

  @Field(() => [EducationInput], { nullable: true })
  education?: EducationInput[];

  @Field(() => [LanguageInput], { nullable: true })
  languages?: LanguageInput[];

  @Field(() => [CertificateInput], { nullable: true })
  certificates?: CertificateInput[];

  @Field(() => [AboutMeTranslationInput], { nullable: true })
  translations?: AboutMeTranslationInput[];
}

@InputType()
class UpdateAboutMeInput {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Number, { nullable: true })
  experience?: number;

  @Field(() => Number, { nullable: true })
  age?: number;

  @Field(() => Number, { nullable: true })
  projectNum?: number;

  @Field(() => [WorkInput], { nullable: true })
  works?: WorkInput[];

  @Field(() => [EducationInput], { nullable: true })
  education?: EducationInput[];

  @Field(() => [LanguageInput], { nullable: true })
  languages?: LanguageInput[];

  @Field(() => [CertificateInput], { nullable: true })
  certificates?: CertificateInput[];

  @Field(() => [AboutMeTranslationInput], { nullable: true })
  translations?: AboutMeTranslationInput[];
}

@InputType()
class WorkInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => Date, { nullable: true })
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  toDate?: Date;

  @Field(() => [WorkTranslationInput], { nullable: true })
  translations?: WorkTranslationInput[];
}

@InputType()
class WorkTranslationInput {
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
class EducationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => Date, { nullable: true })
  fromDate?: Date;

  @Field(() => Date, { nullable: true })
  toDate?: Date;

  @Field(() => [EducationTranslationInput], { nullable: true })
  translations?: EducationTranslationInput[];
}

@InputType()
class EducationTranslationInput {
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
class LanguageInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [LanguageTranslationInput], { nullable: true })
  translations?: LanguageTranslationInput[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
class LanguageTranslationInput {
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
class CertificateInput {
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

  @Field(() => [CertificateTranslationInput], { nullable: true })
  translations?: CertificateTranslationInput[];
}

@InputType()
class CertificateTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  organiation?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class AboutMeTranslationInput {
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

@ObjectType()
class AboutMeResponse {
  @Field(() => String)
  id: string | undefined;
}

@Resolver()
export class AboutMeResolver {
  @Mutation(() => AboutMeResponse)
  async createAboutMe(
    @Arg("data", () => CreateAboutMeInput) data: CreateAboutMeInput,
    @Ctx() { prisma }: Context
  ): Promise<AboutMeResponse> {
    const aboutMe = await prisma.aboutMe.create({
      data: {
        image: data.image || "",
        experience: data.experience || 0,
        age: data.age || 0,
        projectNum: data.projectNum || 0,
        works: {
          create:
            data.works?.map((w) => ({
              link: w.link || "",
              fromDate: w.fromDate || new Date(),
              toDate: w.toDate || new Date(),
              translations: {
                create:
                  w.translations?.map((wt) => ({
                    company: wt.company || "",
                    role: wt.role || "",
                    description: wt.description || "",
                    location: wt.location || "",
                    locationType: wt.locationType || "",
                    employmentType: wt.employmentType || "",
                    languageCode: wt.languageCode || "",
                  })) || [],
              },
            })) || [],
        },
        education: {
          create:
            data.education?.map((e) => ({
              link: e.link || "",
              fromDate: e.fromDate || new Date(),
              toDate: e.toDate || new Date(),
              translations: {
                create:
                  e.translations?.map((et) => ({
                    name: et.name || "",
                    degree: et.degree || "",
                    fieldOfStudy: et.fieldOfStudy || "",
                    gpa: et.gpa || undefined,
                    description: et.description || "",
                    languageCode: et.languageCode || "",
                  })) || [],
              },
            })) || [],
        },
        languages: {
          create:
            data.languages?.map((l) => ({
              translations: {
                create:
                  l.translations?.map((lt) => ({
                    name: lt.name || "",
                    description: lt.description || "",
                    level: lt.level || "",
                    languageCode: lt.languageCode || "",
                  })) || [],
              },
              createdAt: l.createdAt || new Date(),
              updatedAt: l.updatedAt || new Date(),
            })) || [],
        },
        certificates: {
          create:
            data.certificates?.map((c) => ({
              link: c.link || "",
              image: c.image || "",
              issueDate: c.issueDate || new Date(),
              expirationDate: c.expirationDate || "",
              translations: {
                create:
                  c.translations?.map((ct) => ({
                    name: ct.name || "",
                    organiation: ct.organiation || "",
                    description: ct.description || "",
                    languageCode: ct.languageCode || "",
                  })) || [],
              },
            })) || [],
        },
        translations: {
          create:
            data.translations?.map((t) => ({
              name: t.name || "",
              about: t.about || "",
              role: t.role || "",
              country: t.country || "",
              city: t.city || "",
              languageCode: t.languageCode || "",
            })) || [],
        },
      },
    });

    return { id: aboutMe.id };
  }

  @Mutation(() => AboutMeResponse)
  async updateAboutMe(
    @Arg("data", () => UpdateAboutMeInput) data: UpdateAboutMeInput,
    @Ctx() { prisma }: Context
  ): Promise<AboutMeResponse> {
    const aboutMe = await prisma.aboutMe.update({
      where: { id: data.id || "" },
      data: {
        image: data.image || undefined,
        experience: data.experience || undefined,
        age: data.age || undefined,
        projectNum: data.projectNum || undefined,
        works: {
          upsert:
            data.works?.map((w) => ({
              where: {
                id: w.id || uuidv4(),
              },
              update: {
                link: w.link || undefined,
                fromDate: w.fromDate || undefined,
                toDate: w.toDate || undefined,
                translations: {
                  upsert:
                    w.translations?.map((wt) => ({
                      where: {
                        id: wt.id || uuidv4(),
                      },
                      update: {
                        company: wt.company || undefined,
                        role: wt.role || undefined,
                        description: wt.description || undefined,
                        location: wt.location || undefined,
                        locationType: wt.locationType || undefined,
                        employmentType: wt.employmentType || undefined,
                        languageCode: wt.languageCode || undefined,
                      },
                      create: {
                        company: wt.company || "",
                        role: wt.role || "",
                        description: wt.description || "",
                        location: wt.location || "",
                        locationType: wt.locationType || "",
                        employmentType: wt.employmentType || "",
                        languageCode: wt.languageCode || "",
                      },
                    })) || [],
                },
              },
              create: {
                link: w.link || "",
                fromDate: w.fromDate || new Date(),
                toDate: w.toDate || new Date(),
                translations: {
                  create:
                    w.translations?.map((wt) => ({
                      company: wt.company || "",
                      role: wt.role || "",
                      description: wt.description || "",
                      location: wt.location || "",
                      locationType: wt.locationType || "",
                      employmentType: wt.employmentType || "",
                      languageCode: wt.languageCode || "",
                    })) || [],
                },
              },
            })) || [],
        },
        education: {
          upsert:
            data.education?.map((e) => ({
              where: {
                id: e.id || uuidv4(),
              },
              update: {
                link: e.link || undefined,
                fromDate: e.fromDate || undefined,
                toDate: e.toDate || undefined,
                translations: {
                  upsert:
                    e.translations?.map((et) => ({
                      where: {
                        id: et.id || uuidv4(),
                      },
                      update: {
                        name: et.name || undefined,
                        degree: et.degree || undefined,
                        fieldOfStudy: et.fieldOfStudy || undefined,
                        gpa: et.gpa || undefined,
                        description: et.description || undefined,
                        languageCode: et.languageCode || undefined,
                      },
                      create: {
                        name: et.name || "",
                        degree: et.degree || "",
                        fieldOfStudy: et.fieldOfStudy || "",
                        gpa: et.gpa || undefined,
                        description: et.description || "",
                        languageCode: et.languageCode || "",
                      },
                    })) || [],
                },
              },
              create: {
                link: e.link || "",
                fromDate: e.fromDate || new Date(),
                toDate: e.toDate || new Date(),
                translations: {
                  create:
                    e.translations?.map((et) => ({
                      name: et.name || "",
                      degree: et.degree || "",
                      fieldOfStudy: et.fieldOfStudy || "",
                      gpa: et.gpa || undefined,
                      description: et.description || "",
                      languageCode: et.languageCode || "",
                    })) || [],
                },
              },
            })) || [],
        },
        languages: {
          upsert:
            data.languages?.map((l) => ({
              where: {
                id: l.id || uuidv4(),
              },
              update: {
                translations: {
                  upsert:
                    l.translations?.map((lt) => ({
                      where: {
                        id: lt.id || uuidv4(),
                      },
                      update: {
                        name: lt.name || undefined,
                        description: lt.description || undefined,
                        level: lt.level || undefined,
                        languageCode: lt.languageCode || undefined,
                      },
                      create: {
                        name: lt.name || "",
                        description: lt.description || "",
                        level: lt.level || "",
                        languageCode: lt.languageCode || "",
                      },
                    })) || [],
                },
                createdAt: l.createdAt || undefined,
                updatedAt: l.updatedAt || undefined,
              },
              create: {
                translations: {
                  create:
                    l.translations?.map((lt) => ({
                      name: lt.name || "",
                      description: lt.description || "",
                      level: lt.level || "",
                      languageCode: lt.languageCode || "",
                    })) || [],
                },
                createdAt: l.createdAt || new Date(),
                updatedAt: l.updatedAt || new Date(),
              },
            })) || [],
        },
        certificates: {
          upsert:
            data.certificates?.map((c) => ({
              where: {
                id: c.id || uuidv4(),
              },
              update: {
                link: c.link || undefined,
                image: c.image || undefined,
                issueDate: c.issueDate || undefined,
                expirationDate: c.expirationDate || undefined,
                translations: {
                  upsert:
                    c.translations?.map((ct) => ({
                      where: {
                        id: ct.id || uuidv4(),
                      },
                      update: {
                        name: ct.name || undefined,
                        organiation: ct.organiation || undefined,
                        description: ct.description || undefined,
                        languageCode: ct.languageCode || undefined,
                      },
                      create: {
                        name: ct.name || "",
                        organiation: ct.organiation || "",
                        description: ct.description || "",
                        languageCode: ct.languageCode || "",
                      },
                    })) || [],
                },
              },
              create: {
                link: c.link || "",
                image: c.image || "",
                issueDate: c.issueDate || new Date(),
                expirationDate: c.expirationDate || "",
                translations: {
                  create:
                    c.translations?.map((ct) => ({
                      name: ct.name || "",
                      organiation: ct.organiation || "",
                      description: ct.description || "",
                      languageCode: ct.languageCode || "",
                    })) || [],
                },
              },
            })) || [],
        },
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                name: t.name || undefined,
                about: t.about || undefined,
                role: t.role || undefined,
                country: t.country || undefined,
                city: t.city || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                name: t.name || "",
                about: t.about || "",
                role: t.role || "",
                country: t.country || "",
                city: t.city || "",
                languageCode: t.languageCode || "",
              },
            })) || [],
        },
      },
    });

    return { id: aboutMe.id };
  }

  @Query(() => [AboutMeResponse])
  async getAboutMes(@Ctx() { prisma }: Context): Promise<AboutMeResponse[]> {
    const aboutMes = await prisma.aboutMe.findMany({
      include: {
        works: {
          include: {
            translations: true,
          },
        },
        education: {
          include: {
            translations: true,
          },
        },
        languages: {
          include: {
            translations: true,
          },
        },
        certificates: {
          include: {
            translations: true,
          },
        },
        translations: true,
      },
    });
    return aboutMes;
  }

  @Query(() => AboutMeResponse, { nullable: true })
  async getAboutMe(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<AboutMeResponse | null> {
    const aboutMe = await prisma.aboutMe.findUnique({
      where: { id },
      include: {
        works: {
          include: {
            translations: true,
          },
        },
        education: {
          include: {
            translations: true,
          },
        },
        languages: {
          include: {
            translations: true,
          },
        },
        certificates: {
          include: {
            translations: true,
          },
        },
        translations: true,
      },
    });
    return aboutMe;
  }
}
