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
class CreateLinkedinInput {
  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => String, { nullable: true })
  banner: string | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;

  @Field(() => [CreateLinkedinTranslationInput], { nullable: true })
  translations: CreateLinkedinTranslationInput[] | undefined;
}

@InputType()
class CreateLinkedinTranslationInput {
  @Field(() => String, { nullable: true })
  name: string | undefined;

  @Field(() => String, { nullable: true })
  bio: string | undefined;

  @Field(() => String, { nullable: true })
  company: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  university: string | undefined;
}

@InputType()
class UpdateLinkedinInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => String, { nullable: true })
  banner: string | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;

  @Field(() => [UpdateLinkedinTranslationInput], { nullable: true })
  translations: UpdateLinkedinTranslationInput[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedTranslations: string[] | undefined;
}

@InputType()
class UpdateLinkedinTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  name: string | undefined;

  @Field(() => String, { nullable: true })
  bio: string | undefined;

  @Field(() => String, { nullable: true })
  company: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  university: string | undefined;
}

@ObjectType()
class LinkedinResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class LinkedinResolver {
  @Mutation(() => LinkedinResponse)
  async createLinkedin(
    @Arg("data", () => CreateLinkedinInput) data: CreateLinkedinInput,
    @Ctx() { prisma }: Context
  ): Promise<LinkedinResponse> {
    const linkedin = await prisma.linkedin.create({
      data: {
        image: data.image || "",
        banner: data.banner || "",
        link: data.link || "",
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                name: t.name || "",
                bio: t.bio || "",
                company: t.company || "",
                languageCode: t.languageCode || "",
                university: t.university || "",
              })) || [],
          },
        },
      },
    });

    return { id: linkedin.id };
  }

  @Mutation(() => LinkedinResponse)
  async updateLinkedin(
    @Arg("data", () => UpdateLinkedinInput) data: UpdateLinkedinInput,
    @Ctx() { prisma }: Context
  ): Promise<LinkedinResponse> {
    const linkedin = await prisma.linkedin.update({
      where: { id: data.id },
      data: {
        image: data.image || undefined,
        banner: data.banner || undefined,
        link: data.link || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                name: t.name || undefined,
                bio: t.bio || undefined,
                company: t.company || undefined,
                languageCode: t.languageCode || undefined,
                university: t.university || undefined,
              },
              create: {
                name: t.name || "",
                bio: t.bio || "",
                company: t.company || "",
                languageCode: t.languageCode || "",
                university: t.university || "",
                linkedin: {
                  connect: { id: data.id },
                },
              },
            })) || [],
        },
      } as Prisma.LinkedinUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.linkedinTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: linkedin.id };
  }

  @Query(() => LinkedinResponse, { nullable: true })
  async getLinkedin(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<LinkedinResponse | null> {
    return await prisma.linkedin.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [LinkedinResponse])
  async getAllLinkedin(
    @Ctx() { prisma }: Context
  ): Promise<LinkedinResponse[]> {
    return await prisma.linkedin.findMany({
      include: {
        translations: true,
      },
    });
  }
}
