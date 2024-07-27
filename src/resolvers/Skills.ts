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

@InputType()
class CreateSkillsInput {
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => [CreateSkillsTranslationInput], { nullable: true })
  translations?: CreateSkillsTranslationInput[];
}

@InputType()
class CreateSkillsTranslationInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateSkillsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => [UpdateSkillsTranslationInput], { nullable: true })
  translations?: UpdateSkillsTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
class UpdateSkillsTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
class SkillsResponse {
  @Field(() => String, { nullable: true })
  id?: string;
}

@Resolver()
export class SkillsResolver {
  @Mutation(() => SkillsResponse)
  async createSkills(
    @Arg("data", () => CreateSkillsInput) data: CreateSkillsInput,
    @Ctx() { prisma }: Context
  ): Promise<SkillsResponse> {
    const skills = await prisma.skills.create({
      data: {
        link: data.link || "",
        color: data.color || "",
        image: data.image || "",
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                name: t.name || "",
                about: t.about || "",
                languageCode: t.languageCode || "",
              })) || [],
          },
        },
      },
    });

    return { id: skills.id };
  }

  @Mutation(() => SkillsResponse)
  async updateSkills(
    @Arg("data", () => UpdateSkillsInput) data: UpdateSkillsInput,
    @Ctx() { prisma }: Context
  ): Promise<SkillsResponse> {
    const skills = await prisma.skills.update({
      where: { id: data.id || "" },
      data: {
        link: data.link || undefined,
        color: data.color || undefined,
        image: data.image || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                name: t.name || undefined,
                about: t.about || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                name: t.name || "",
                about: t.about || "",
                languageCode: t.languageCode || "",
                skills: {
                  connect: { id: data.id || "" },
                },
              },
            })) || [],
        },
      } as Prisma.SkillsUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.skillsTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: skills.id };
  }

  @Query(() => [SkillsResponse])
  async getSkills(@Ctx() { prisma }: Context): Promise<SkillsResponse[]> {
    return await prisma.skills.findMany({
      include: {
        translations: true,
      },
    });
  }

  @Query(() => SkillsResponse, { nullable: true })
  async getSkill(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<SkillsResponse | null> {
    return await prisma.skills.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }
}
