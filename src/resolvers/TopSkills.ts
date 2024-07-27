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
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@InputType()
class CreateTopSkillInput {
  @Field(() => String, { nullable: true })
  linkedinId: string | undefined;

  @Field(() => [CreateTopSkillTranslationInput], { nullable: true })
  translations: CreateTopSkillTranslationInput[] | undefined;
}

@InputType()
class CreateTopSkillTranslationInput {
  @Field(() => String, { nullable: true })
  linkedinName: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  name: string | undefined;
}

@InputType()
class UpdateTopSkillInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => [UpdateTopSkillTranslationInput], { nullable: true })
  translations: UpdateTopSkillTranslationInput[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedTranslations: string[] | undefined;
}

@InputType()
class UpdateTopSkillTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  linkedinName: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  name: string | undefined;
}

@ObjectType()
class TopSkillResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class TopSkillResolver {
  @Mutation(() => TopSkillResponse)
  async createTopSkill(
    @Arg("data", () => CreateTopSkillInput) data: CreateTopSkillInput,
    @Ctx() { prisma }: Context
  ): Promise<TopSkillResponse> {
    const topSkill = await prisma.topSkills.create({
      data: {
        linkedinId: data.linkedinId || "",
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                linkedinName: t.linkedinName || "",
                languageCode: t.languageCode || "",
                name: t.name || "",
              })) || [],
          },
        },
      },
    });

    return { id: topSkill.id };
  }

  @Mutation(() => TopSkillResponse)
  async updateTopSkill(
    @Arg("data", () => UpdateTopSkillInput) data: UpdateTopSkillInput,
    @Ctx() { prisma }: Context
  ): Promise<TopSkillResponse> {
    const topSkill = await prisma.topSkills.update({
      where: { id: data.id },
      data: {
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                linkedinName: t.linkedinName || undefined,
                languageCode: t.languageCode || undefined,
                name: t.name || undefined,
              },
              create: {
                linkedinName: t.linkedinName || "",
                languageCode: t.languageCode || "",
                name: t.name || "",
                topSkills: {
                  connect: { id: data.id },
                },
              },
            })) || [],
        },
      } as Prisma.TopSkillsUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.topSkillsTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: topSkill.id };
  }

  @Query(() => [TopSkillResponse])
  async getTopSkills(@Ctx() { prisma }: Context): Promise<TopSkillResponse[]> {
    return await prisma.topSkills.findMany({
      include: {
        translations: true,
      },
    });
  }

  @Query(() => TopSkillResponse, { nullable: true })
  async getTopSkill(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<TopSkillResponse | null> {
    return await prisma.topSkills.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }
}
