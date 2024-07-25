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
class CreateProfileWorksInput {
  @Field(() => String, { nullable: true })
  workLogo: string | undefined;

  @Field(() => String, { nullable: true })
  fromDate: string | undefined;

  @Field(() => String, { nullable: true })
  toDate: string | undefined;

  @Field(() => [CreateProfileWorksTranslationInput], { nullable: true })
  translations: CreateProfileWorksTranslationInput[] | undefined;

  @Field(() => String, { nullable: true })
  profileTranslationsId: string | undefined;
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

  @Field(() => String, { nullable: true })
  profileTranslationsId: string | undefined;
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

@ObjectType()
class ProfileWorksResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class ProfileWorksResolver {
  @Mutation(() => ProfileWorksResponse)
  async createProfileWorks(
    @Arg("data", () => CreateProfileWorksInput) data: CreateProfileWorksInput,
    @Ctx() { prisma }: Context
  ): Promise<ProfileWorksResponse> {
    const profileWorks = await prisma.profileWorks.create({
      data: {
        workLogo: data.workLogo || "",
        fromDate: data.fromDate || "",
        toDate: data.toDate || "",
        profileTranslations: {
          connect: { id: data.profileTranslationsId || "" },
        },
        translations: {
          create:
            data.translations?.map((t) => ({
              work: t.work || "",
              workAbout: t.workAbout || "",
              position: t.position || "",
              languageCode: t.languageCode || "",
            })) || [],
        },
      },
    });

    return { id: profileWorks.id };
  }

  @Mutation(() => ProfileWorksResponse)
  async updateProfileWorks(
    @Arg("data", () => UpdateProfileWorksInput) data: UpdateProfileWorksInput,
    @Ctx() { prisma }: Context
  ): Promise<ProfileWorksResponse> {
    const profileWorks = await prisma.profileWorks.update({
      where: { id: data.id || "" },
      data: {
        workLogo: data.workLogo || undefined,
        fromDate: data.fromDate || undefined,
        toDate: data.toDate || undefined,
        profileTranslations: {
          connect: { id: data.profileTranslationsId || "" },
        },
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                work: t.work || undefined,
                workAbout: t.workAbout || undefined,
                position: t.position || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                work: t.work || "",
                workAbout: t.workAbout || "",
                position: t.position || "",
                languageCode: t.languageCode || "",
              },
            })) || [],
        },
      },
    });

    return { id: profileWorks.id };
  }
}
