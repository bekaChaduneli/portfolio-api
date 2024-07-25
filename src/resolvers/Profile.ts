import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  ObjectType,
  Field,
  InputType,
} from "type-graphql";
import { Context } from "..";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@InputType()
class CreateProfileInput {
  @Field(() => String, { nullable: true })
  age: string | undefined;

  @Field(() => String, { nullable: true })
  resume: string | undefined;

  @Field(() => String, { nullable: true })
  Image: string | undefined;

  @Field(() => String, { nullable: true })
  mail: string | undefined;

  @Field(() => [CreateProfileTranslationsInput], { nullable: true })
  translations: CreateProfileTranslationsInput[] | undefined;

  @Field(() => [CreateProfileWorksInput], { nullable: true })
  works: CreateProfileWorksInput[] | undefined;

  @Field(() => [CreateHobbysInput], { nullable: true })
  hobbys: CreateHobbysInput[] | undefined;

  @Field(() => [CreateQuestionsInput], { nullable: true })
  questions: CreateQuestionsInput[] | undefined;

  @Field(() => [CreateSocialsInput], { nullable: true })
  socials: CreateSocialsInput[] | undefined;
}

@InputType()
class CreateProfileTranslationsInput {
  @Field(() => String, { nullable: true })
  name: string | undefined;

  @Field(() => String, { nullable: true })
  surname: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  profession: string | undefined;

  @Field(() => String, { nullable: true })
  location: string | undefined;

  @Field(() => String, { nullable: true })
  experience: string | undefined;

  @Field(() => String, { nullable: true })
  university: string | undefined;

  @Field(() => String, { nullable: true })
  universityAbout: string | undefined;

  @Field(() => String, { nullable: true })
  aboutMe: string | undefined;

  @Field(() => [CreateProfileWorksInput], { nullable: true })
  works: CreateProfileWorksInput[] | undefined;

  @Field(() => [CreateHobbysInput], { nullable: true })
  hobbys: CreateHobbysInput[] | undefined;

  @Field(() => [CreateQuestionsInput], { nullable: true })
  questions: CreateQuestionsInput[] | undefined;

  @Field(() => [CreateSocialsInput], { nullable: true })
  socials: CreateSocialsInput[] | undefined;
}

@InputType()
class CreateSocialsInput {
  @Field(() => String, { nullable: true })
  profileId: string | undefined;

  @Field(() => String, { nullable: true })
  name: string | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;
}

@InputType()
class UpdateSocialsInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  profileId: string | undefined;

  @Field(() => String, { nullable: true })
  name: string | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;
}

@InputType()
class CreateProfileWorksInput {
  @Field(() => String, { nullable: true })
  workLogo: string | undefined;

  @Field(() => String, { nullable: true })
  fromDate: string | undefined;

  @Field(() => String, { nullable: true })
  toDate: string | undefined;

  @Field(() => [CreateProfileWorksTranslationInput], { nullable: true })
  translations: CreateProfileWorksTranslationInput[] | undefined;
}

@InputType()
class CreateProfileWorksTranslationInput {
  @Field(() => String, { nullable: true })
  work: string | undefined;

  @Field(() => String, { nullable: true })
  workAbout: string | undefined;

  @Field(() => String, { nullable: true })
  position: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@InputType()
class CreateHobbysInput {
  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => [CreateHobbysTranslationInput], { nullable: true })
  translations: CreateHobbysTranslationInput[] | undefined;
}

@InputType()
class CreateHobbysTranslationInput {
  @Field(() => String, { nullable: true })
  hobby: string | undefined;

  @Field(() => String, { nullable: true })
  aboutHobby: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@InputType()
class CreateQuestionsInput {
  @Field(() => String, { nullable: true })
  question: string | undefined;

  @Field(() => String, { nullable: true })
  answer: string | undefined;

  @Field(() => [CreateQuestionsTranslationInput], { nullable: true })
  translations: CreateQuestionsTranslationInput[] | undefined;
}

@InputType()
class CreateQuestionsTranslationInput {
  @Field(() => String, { nullable: true })
  question: string | undefined;

  @Field(() => String, { nullable: true })
  answer: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@InputType()
class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  age: string | undefined;

  @Field(() => String, { nullable: true })
  resume: string | undefined;

  @Field(() => String, { nullable: true })
  Image: string | undefined;

  @Field(() => String, { nullable: true })
  mail: string | undefined;

  @Field(() => [UpdateProfileTranslationsInput], { nullable: true })
  translations: UpdateProfileTranslationsInput[] | undefined;

  @Field(() => [UpdateProfileWorksInput], { nullable: true })
  works: UpdateProfileWorksInput[] | undefined;

  @Field(() => [UpdateHobbysInput], { nullable: true })
  hobbys: UpdateHobbysInput[] | undefined;

  @Field(() => [UpdateQuestionsInput], { nullable: true })
  questions: UpdateQuestionsInput[] | undefined;

  @Field(() => [UpdateSocialsInput], { nullable: true })
  socials: UpdateSocialsInput[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedTranslations: string[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedWorks: string[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedHobbys: string[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedQuestions: string[] | undefined;
}

@InputType()
class UpdateProfileTranslationsInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  name: string | undefined;

  @Field(() => String, { nullable: true })
  surname: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  profession: string | undefined;

  @Field(() => String, { nullable: true })
  location: string | undefined;

  @Field(() => String, { nullable: true })
  experience: string | undefined;

  @Field(() => String, { nullable: true })
  university: string | undefined;

  @Field(() => String, { nullable: true })
  universityAbout: string | undefined;

  @Field(() => String, { nullable: true })
  aboutMe: string | undefined;

  @Field(() => [UpdateProfileWorksInput], { nullable: true })
  works: UpdateProfileWorksInput[] | undefined;

  @Field(() => [UpdateHobbysInput], { nullable: true })
  hobbys: UpdateHobbysInput[] | undefined;

  @Field(() => [UpdateQuestionsInput], { nullable: true })
  questions: UpdateQuestionsInput[] | undefined;

  @Field(() => [UpdateSocialsInput], { nullable: true })
  socials: UpdateSocialsInput[] | undefined;
}

@InputType()
class UpdateProfileWorksInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  workLogo: string | undefined;

  @Field(() => String, { nullable: true })
  fromDate: string | undefined;

  @Field(() => String, { nullable: true })
  toDate: string | undefined;

  @Field(() => [UpdateProfileWorksTranslationInput], { nullable: true })
  translations: UpdateProfileWorksTranslationInput[] | undefined;
}

@InputType()
class UpdateProfileWorksTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  work: string | undefined;

  @Field(() => String, { nullable: true })
  workAbout: string | undefined;

  @Field(() => String, { nullable: true })
  position: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@InputType()
class UpdateHobbysInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => [UpdateHobbysTranslationInput], { nullable: true })
  translations: UpdateHobbysTranslationInput[] | undefined;
}

@InputType()
class UpdateHobbysTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  hobby: string | undefined;

  @Field(() => String, { nullable: true })
  aboutHobby: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@InputType()
class UpdateQuestionsInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  question: string | undefined;

  @Field(() => String, { nullable: true })
  answer: string | undefined;

  @Field(() => [UpdateQuestionsTranslationInput], { nullable: true })
  translations: UpdateQuestionsTranslationInput[] | undefined;
}

@InputType()
class UpdateQuestionsTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  question: string | undefined;

  @Field(() => String, { nullable: true })
  answer: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
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
}
