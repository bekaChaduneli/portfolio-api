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
class CreateHobbysInput {
  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => String, { nullable: true })
  profileTranslationsId: string | undefined;

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
class UpdateHobbysInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => [UpdateHobbysTranslationInput], { nullable: true })
  translations: UpdateHobbysTranslationInput[] | undefined;

  @Field(() => String, { nullable: true })
  profileTranslationsId: string | undefined;
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

@ObjectType()
class HobbysResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class HobbysResolver {
  @Mutation(() => HobbysResponse)
  async createHobbys(
    @Arg("data", () => CreateHobbysInput) data: CreateHobbysInput,
    @Ctx() { prisma }: Context
  ): Promise<HobbysResponse> {
    const hobbys = await prisma.hobbys.create({
      data: {
        image: data.image || "",
        profileTranslations: {
          connect: { id: data.profileTranslationsId || "" },
        },
        translations: {
          create:
            data.translations?.map((t) => ({
              hobby: t.hobby || "",
              aboutHobby: t.aboutHobby || "",
              languageCode: t.languageCode || "",
            })) || [],
        },
      },
    });

    return { id: hobbys.id };
  }

  @Mutation(() => HobbysResponse)
  async updateHobbys(
    @Arg("data", () => UpdateHobbysInput) data: UpdateHobbysInput,
    @Ctx() { prisma }: Context
  ): Promise<HobbysResponse> {
    const hobbys = await prisma.hobbys.update({
      where: { id: data.id || "" },
      data: {
        image: data.image || undefined,
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
                hobby: t.hobby || undefined,
                aboutHobby: t.aboutHobby || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                hobby: t.hobby || "",
                aboutHobby: t.aboutHobby || "",
                languageCode: t.languageCode || "",
              },
            })) || [],
        },
      },
    });

    return { id: hobbys.id };
  }
}
