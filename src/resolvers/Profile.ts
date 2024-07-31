import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  ObjectType,
  Field,
  Query,
  InputType,
} from "type-graphql";
import { Context } from "..";
import { v4 as uuidv4 } from "uuid";

@InputType()
class CreateProfileInput {
  @Field(() => String, { nullable: true })
  age?: string;

  @Field(() => String, { nullable: true })
  resume?: string;

  @Field(() => String, { nullable: true })
  Image?: string;

  @Field(() => String, { nullable: true })
  mail?: string;

  @Field(() => [CreateProfileTranslationsInput], { nullable: true })
  translations?: CreateProfileTranslationsInput[];

  @Field(() => [CreateProfileWorksInput], { nullable: true })
  works?: CreateProfileWorksInput[];

  @Field(() => [CreateHobbysInput], { nullable: true })
  hobbys?: CreateHobbysInput[];

  @Field(() => [CreateQuestionsInput], { nullable: true })
  questions?: CreateQuestionsInput[];

  @Field(() => [CreateSocialsInput], { nullable: true })
  socials?: CreateSocialsInput[];
}

@InputType()
class CreateProfileTranslationsInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;

  @Field(() => String, { nullable: true })
  profession?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  experience?: string;

  @Field(() => String, { nullable: true })
  university?: string;

  @Field(() => String, { nullable: true })
  universityAbout?: string;

  @Field(() => String, { nullable: true })
  aboutMe?: string;

  @Field(() => [CreateProfileWorksInput], { nullable: true })
  works?: CreateProfileWorksInput[];

  @Field(() => [CreateHobbysInput], { nullable: true })
  hobbys?: CreateHobbysInput[];

  @Field(() => [CreateQuestionsInput], { nullable: true })
  questions?: CreateQuestionsInput[];

  @Field(() => [CreateSocialsInput], { nullable: true })
  socials?: CreateSocialsInput[];
}

@InputType()
class CreateSocialsInput {
  @Field(() => String, { nullable: true })
  profileId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  link?: string;
}

@InputType()
class UpdateSocialsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  profileId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  link?: string;
}

@InputType()
class CreateProfileWorksInput {
  @Field(() => String, { nullable: true })
  workLogo?: string;

  @Field(() => String, { nullable: true })
  fromDate?: string;

  @Field(() => String, { nullable: true })
  toDate?: string;

  @Field(() => [CreateProfileWorksTranslationInput], { nullable: true })
  translations?: CreateProfileWorksTranslationInput[];
}

@InputType()
class CreateProfileWorksTranslationInput {
  @Field(() => String, { nullable: true })
  work?: string;

  @Field(() => String, { nullable: true })
  workAbout?: string;

  @Field(() => String, { nullable: true })
  position?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class CreateHobbysInput {
  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => [CreateHobbysTranslationInput], { nullable: true })
  translations?: CreateHobbysTranslationInput[];
}

@InputType()
class CreateHobbysTranslationInput {
  @Field(() => String, { nullable: true })
  hobby?: string;

  @Field(() => String, { nullable: true })
  aboutHobby?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class CreateQuestionsInput {
  @Field(() => String, { nullable: true })
  question?: string;

  @Field(() => String, { nullable: true })
  answer?: string;

  @Field(() => [CreateQuestionsTranslationInput], { nullable: true })
  translations?: CreateQuestionsTranslationInput[];
}

@InputType()
class CreateQuestionsTranslationInput {
  @Field(() => String, { nullable: true })
  question?: string;

  @Field(() => String, { nullable: true })
  answer?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  age?: string;

  @Field(() => String, { nullable: true })
  resume?: string;

  @Field(() => String, { nullable: true })
  Image?: string;

  @Field(() => String, { nullable: true })
  mail?: string;

  @Field(() => [UpdateProfileTranslationsInput], { nullable: true })
  translations?: UpdateProfileTranslationsInput[];

  @Field(() => [UpdateProfileWorksInput], { nullable: true })
  works?: UpdateProfileWorksInput[];

  @Field(() => [UpdateHobbysInput], { nullable: true })
  hobbys?: UpdateHobbysInput[];

  @Field(() => [UpdateQuestionsInput], { nullable: true })
  questions?: UpdateQuestionsInput[];

  @Field(() => [UpdateSocialsInput], { nullable: true })
  socials?: UpdateSocialsInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];

  @Field(() => [String], { nullable: true })
  deletedWorks?: string[];

  @Field(() => [String], { nullable: true })
  deletedHobbys?: string[];

  @Field(() => [String], { nullable: true })
  deletedQuestions?: string[];
}

@InputType()
class UpdateProfileTranslationsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;

  @Field(() => String, { nullable: true })
  profession?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  experience?: string;

  @Field(() => String, { nullable: true })
  university?: string;

  @Field(() => String, { nullable: true })
  universityAbout?: string;

  @Field(() => String, { nullable: true })
  aboutMe?: string;

  @Field(() => [UpdateProfileWorksInput], { nullable: true })
  works?: UpdateProfileWorksInput[];

  @Field(() => [UpdateHobbysInput], { nullable: true })
  hobbys?: UpdateHobbysInput[];

  @Field(() => [UpdateQuestionsInput], { nullable: true })
  questions?: UpdateQuestionsInput[];

  @Field(() => [UpdateSocialsInput], { nullable: true })
  socials?: UpdateSocialsInput[];
}

@InputType()
class UpdateProfileWorksInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  workLogo?: string;

  @Field(() => String, { nullable: true })
  fromDate?: string;

  @Field(() => String, { nullable: true })
  toDate?: string;

  @Field(() => [UpdateProfileWorksTranslationInput], { nullable: true })
  translations?: UpdateProfileWorksTranslationInput[];
}

@InputType()
class UpdateProfileWorksTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  work?: string;

  @Field(() => String, { nullable: true })
  workAbout?: string;

  @Field(() => String, { nullable: true })
  position?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateHobbysInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => [UpdateHobbysTranslationInput], { nullable: true })
  translations?: UpdateHobbysTranslationInput[];
}

@InputType()
class UpdateHobbysTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  hobby?: string;

  @Field(() => String, { nullable: true })
  aboutHobby?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateQuestionsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  question?: string;

  @Field(() => String, { nullable: true })
  answer?: string;

  @Field(() => [UpdateQuestionsTranslationInput], { nullable: true })
  translations?: UpdateQuestionsTranslationInput[];
}

@InputType()
class UpdateQuestionsTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  question?: string;

  @Field(() => String, { nullable: true })
  answer?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
class ProfileResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class ProfileResolver {
  @Mutation(() => ProfileResponse)
  async createProfile(
    @Arg("data", () => CreateProfileInput) data: CreateProfileInput,
    @Ctx() { prisma }: Context
  ): Promise<ProfileResponse> {
    const profile = await prisma.profile.create({
      data: {
        age: data.age || "",
        resume: data.resume || "",
        Image: data.Image || "",
        mail: data.mail || "",
        translations: {
          create:
            data.translations?.map((t) => ({
              name: t.name || "",
              surname: t.surname || "",
              languageCode: t.languageCode || "",
              profession: t.profession || "",
              location: t.location || "",
              experience: t.experience || "",
              university: t.university || "",
              universityAbout: t.universityAbout || "",
              aboutMe: t.aboutMe || "",
              works: {
                create:
                  t.works?.map((w) => ({
                    workLogo: w.workLogo || "",
                    fromDate: w.fromDate || "",
                    toDate: w.toDate || "",
                    translations: {
                      create:
                        w.translations?.map((wt) => ({
                          work: wt.work || "",
                          workAbout: wt.workAbout || "",
                          position: wt.position || "",
                          languageCode: wt.languageCode || "",
                        })) || [],
                    },
                  })) || [],
              },
              hobbys: {
                create:
                  t.hobbys?.map((h) => ({
                    image: h.image || "",
                    translations: {
                      create:
                        h.translations?.map((ht) => ({
                          hobby: ht.hobby || "",
                          aboutHobby: ht.aboutHobby || "",
                          languageCode: ht.languageCode || "",
                        })) || [],
                    },
                  })) || [],
              },
              questions: {
                create:
                  t.questions?.map((q) => ({
                    question: q.question || "",
                    answer: q.answer || "",
                    translations: {
                      create:
                        q.translations?.map((qt) => ({
                          question: qt.question || "",
                          answer: qt.answer || "",
                          languageCode: qt.languageCode || "",
                        })) || [],
                    },
                  })) || [],
              },
              socials: {
                create:
                  data.socials?.map((s) => ({
                    profileId: s.profileId || "",
                    name: s.name || "",
                    link: s.link || "",
                  })) || [],
              },
            })) || [],
        },
      },
    });

    return { id: profile.id };
  }

  @Mutation(() => ProfileResponse)
  async updateProfile(
    @Arg("data", () => UpdateProfileInput) data: UpdateProfileInput,
    @Ctx() { prisma }: Context
  ): Promise<ProfileResponse> {
    const profile = await prisma.profile.update({
      where: { id: data.id || "" },
      data: {
        age: data.age || undefined,
        resume: data.resume || undefined,
        Image: data.Image || undefined,
        mail: data.mail || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                name: t.name || undefined,
                surname: t.surname || undefined,
                languageCode: t.languageCode || undefined,
                profession: t.profession || undefined,
                location: t.location || undefined,
                experience: t.experience || undefined,
                university: t.university || undefined,
                universityAbout: t.universityAbout || undefined,
                aboutMe: t.aboutMe || undefined,
                works: {
                  upsert:
                    t.works?.map((w) => ({
                      where: {
                        id: w.id || uuidv4(),
                      },
                      update: {
                        workLogo: w.workLogo || undefined,
                        fromDate: w.fromDate || undefined,
                        toDate: w.toDate || undefined,
                        translations: {
                          upsert:
                            w.translations?.map((wt) => ({
                              where: {
                                id: wt.id || uuidv4(),
                              },
                              update: {
                                work: wt.work || undefined,
                                workAbout: wt.workAbout || undefined,
                                position: wt.position || undefined,
                                languageCode: wt.languageCode || undefined,
                              },
                              create: {
                                work: wt.work || "",
                                workAbout: wt.workAbout || "",
                                position: wt.position || "",
                                languageCode: wt.languageCode || "",
                              },
                            })) || [],
                        },
                      },
                      create: {
                        workLogo: w.workLogo || "",
                        fromDate: w.fromDate || "",
                        toDate: w.toDate || "",
                        translations: {
                          create:
                            w.translations?.map((wt) => ({
                              work: wt.work || "",
                              workAbout: wt.workAbout || "",
                              position: wt.position || "",
                              languageCode: wt.languageCode || "",
                            })) || [],
                        },
                      },
                    })) || [],
                },
                hobbys: {
                  upsert:
                    t.hobbys?.map((h) => ({
                      where: {
                        id: h.id || uuidv4(),
                      },
                      update: {
                        image: h.image || undefined,
                        translations: {
                          upsert:
                            h.translations?.map((ht) => ({
                              where: {
                                id: ht.id || uuidv4(),
                              },
                              update: {
                                hobby: ht.hobby || undefined,
                                aboutHobby: ht.aboutHobby || undefined,
                                languageCode: ht.languageCode || undefined,
                              },
                              create: {
                                hobby: ht.hobby || "",
                                aboutHobby: ht.aboutHobby || "",
                                languageCode: ht.languageCode || "",
                              },
                            })) || [],
                        },
                      },
                      create: {
                        image: h.image || "",
                        translations: {
                          create:
                            h.translations?.map((ht) => ({
                              hobby: ht.hobby || "",
                              aboutHobby: ht.aboutHobby || "",
                              languageCode: ht.languageCode || "",
                            })) || [],
                        },
                      },
                    })) || [],
                },
                questions: {
                  upsert:
                    t.questions?.map((q) => ({
                      where: {
                        id: q.id || uuidv4(),
                      },
                      update: {
                        question: q.question || undefined,
                        answer: q.answer || undefined,
                        translations: {
                          upsert:
                            q.translations?.map((qt) => ({
                              where: {
                                id: qt.id || uuidv4(),
                              },
                              update: {
                                question: qt.question || undefined,
                                answer: qt.answer || undefined,
                                languageCode: qt.languageCode || undefined,
                              },
                              create: {
                                question: qt.question || "",
                                answer: qt.answer || "",
                                languageCode: qt.languageCode || "",
                              },
                            })) || [],
                        },
                      },
                      create: {
                        question: q.question || "",
                        answer: q.answer || "",
                        translations: {
                          create:
                            q.translations?.map((qt) => ({
                              question: qt.question || "",
                              answer: qt.answer || "",
                              languageCode: qt.languageCode || "",
                            })) || [],
                        },
                      },
                    })) || [],
                },

                socials: {
                  upsert:
                    data.socials?.map((s) => ({
                      where: {
                        id: s.id || uuidv4(),
                      },
                      update: {
                        profileId: s.profileId || undefined,
                        name: s.name || undefined,
                        link: s.link || undefined,
                      },
                      create: {
                        profileId: s.profileId || "",
                        name: s.name || "",
                        link: s.link || "",
                      },
                    })) || [],
                },
              },
              create: {
                name: t.name || "",
                surname: t.surname || "",
                languageCode: t.languageCode || "",
                profession: t.profession || "",
                location: t.location || "",
                experience: t.experience || "",
                university: t.university || "",
                universityAbout: t.universityAbout || "",
                aboutMe: t.aboutMe || "",
                works: {
                  create:
                    t.works?.map((w) => ({
                      workLogo: w.workLogo || "",
                      fromDate: w.fromDate || "",
                      toDate: w.toDate || "",
                      translations: {
                        create:
                          w.translations?.map((wt) => ({
                            work: wt.work || "",
                            workAbout: wt.workAbout || "",
                            position: wt.position || "",
                            languageCode: wt.languageCode || "",
                          })) || [],
                      },
                    })) || [],
                },
                hobbys: {
                  create:
                    t.hobbys?.map((h) => ({
                      image: h.image || "",
                      translations: {
                        create:
                          h.translations?.map((ht) => ({
                            hobby: ht.hobby || "",
                            aboutHobby: ht.aboutHobby || "",
                            languageCode: ht.languageCode || "",
                          })) || [],
                      },
                    })) || [],
                },
                questions: {
                  create:
                    t.questions?.map((q) => ({
                      question: q.question || "",
                      answer: q.answer || "",
                      translations: {
                        create:
                          q.translations?.map((qt) => ({
                            question: qt.question || "",
                            answer: qt.answer || "",
                            languageCode: qt.languageCode || "",
                          })) || [],
                      },
                    })) || [],
                },
                socials: {
                  create:
                    data.socials?.map((s) => ({
                      profileId: s.profileId || "",
                      name: s.name || "",
                      link: s.link || "",
                    })) || [],
                },
              },
            })) || [],
        },
      },
    });

    return { id: profile.id };
  }

  @Query(() => ProfileResponse, { nullable: true })
  async getProfile(
    @Arg("id", () => String) id: string,
    @Ctx() ctx: Context
  ): Promise<ProfileResponse | null> {
    return await ctx.prisma.profile.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            translations: true,
          },
        },
        hobbys: {
          include: {
            translations: true,
          },
        },
        socials: true,
        works: {
          include: {
            translations: true,
          },
        },
        translations: true,
      },
    });
  }
}
