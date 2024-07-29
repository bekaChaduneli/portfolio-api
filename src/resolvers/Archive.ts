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
class CreateArchiveInput {
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  github?: string;

  @Field(() => String, { nullable: true })
  background?: string;

  @Field(() => [String], { nullable: true })
  skills?: string[];

  @Field(() => [CreateArchiveTranslationInput], { nullable: true })
  translations?: CreateArchiveTranslationInput[];

  @Field(() => Boolean, { nullable: true })
  isReal?: boolean;
}

@InputType()
class CreateArchiveTranslationInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;

  @Field(() => String, { nullable: true })
  markdown?: string;

  @Field(() => String, { nullable: true })
  location?: string;
}

@InputType()
class UpdateArchiveInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  github?: string;

  @Field(() => String, { nullable: true })
  background?: string;

  @Field(() => [String], { nullable: true })
  skills?: string[];

  @Field(() => [UpdateArchiveTranslationInput], { nullable: true })
  translations?: UpdateArchiveTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];

  @Field(() => Boolean, { nullable: true })
  isReal?: boolean;
}

@InputType()
class UpdateArchiveTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;

  @Field(() => String, { nullable: true })
  markdown?: string;

  @Field(() => String, { nullable: true })
  location?: string;
}

@ObjectType()
class ArchiveResponse {
  @Field(() => String, { nullable: true })
  id?: string;
}

@Resolver()
export class ArchiveResolver {
  @Mutation(() => ArchiveResponse)
  async createArchive(
    @Arg("data", () => CreateArchiveInput) data: CreateArchiveInput,
    @Ctx() { prisma }: Context
  ): Promise<ArchiveResponse> {
    const archive = await prisma.archive.create({
      data: {
        link: data.link || "",
        github: data.github || "",
        background: data.background || "",
        skills: data.skills || [],
        isReal: data.isReal || false,
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                description: t.description || "",
                name: t.name || "",
                languageCode: t.languageCode || "",
                location: t.location || "",
                markdown: t.markdown || "",
              })) || [],
          },
        },
      },
    });

    return { id: archive.id };
  }

  @Mutation(() => ArchiveResponse)
  async updateArchive(
    @Arg("data", () => UpdateArchiveInput) data: UpdateArchiveInput,
    @Ctx() { prisma }: Context
  ): Promise<ArchiveResponse> {
    const archive = await prisma.archive.update({
      where: { id: data.id || "" },
      data: {
        link: data.link || undefined,
        github: data.github || undefined,
        background: data.background || undefined,
        skills: data.skills || undefined,
        isReal: data.isReal || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                description: t.description || undefined,
                name: t.name || undefined,
                languageCode: t.languageCode || undefined,
                markdown: t.markdown || undefined,
                location: t.location || undefined,
              },
              create: {
                description: t.description || "",
                name: t.name || "",
                languageCode: t.languageCode || "",
                markdown: t.markdown || undefined,
                location: t.location || "",
                archive: {
                  connect: { id: data.id || "" },
                },
              },
            })) || [],
        },
      } as Prisma.ArchiveUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.archiveTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: archive.id };
  }

  @Query(() => ArchiveResponse, { nullable: true })
  async getArchive(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<ArchiveResponse | null> {
    return await prisma.archive.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [ArchiveResponse])
  async getAllArchives(@Ctx() { prisma }: Context): Promise<ArchiveResponse[]> {
    return await prisma.archive.findMany({
      include: {
        translations: true,
      },
    });
  }
}
