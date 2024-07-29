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
class CreateMainProjectInput {
  @Field(() => String, { nullable: true })
  background?: string;

  @Field(() => [String], { nullable: true })
  mobileBackgrounds?: string[];

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => [String], { nullable: true })
  video?: string[];

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field(() => [String], { nullable: true })
  skills?: string[];

  @Field(() => String, { nullable: true })
  github?: string;

  @Field(() => Boolean, { nullable: true })
  isReal?: boolean;

  @Field(() => [CreateMainProjectTranslationInput], { nullable: true })
  translations?: CreateMainProjectTranslationInput[];
}

@InputType()
class CreateMainProjectTranslationInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;

  @Field(() => String, { nullable: true })
  markdown?: string;
}

@InputType()
class UpdateMainProjectInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  background?: string;

  @Field(() => [String], { nullable: true })
  mobileBackgrounds?: string[];

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => [String], { nullable: true })
  video?: string[];

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field(() => [String], { nullable: true })
  skills?: string[];

  @Field(() => String, { nullable: true })
  github?: string;

  @Field(() => Boolean, { nullable: true })
  isReal?: boolean;

  @Field(() => [UpdateMainProjectTranslationInput], { nullable: true })
  translations?: UpdateMainProjectTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
class UpdateMainProjectTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  markdown?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
class MainProjectResponse {
  @Field(() => String, { nullable: true })
  id?: string;
}

@Resolver()
export class MainProjectResolver {
  @Mutation(() => MainProjectResponse)
  async createMainProject(
    @Arg("data", () => CreateMainProjectInput) data: CreateMainProjectInput,
    @Ctx() { prisma }: Context
  ): Promise<MainProjectResponse> {
    const mainProject = await prisma.mainProjects.create({
      data: {
        background: data.background ?? "",
        mobileBackgrounds: data.mobileBackgrounds ?? [],
        link: data.link ?? "",
        video: data.video ?? [],
        images: data.images ?? [],
        skills: data.skills ?? [],
        github: data.github ?? "",
        isReal: data.isReal ?? false,
        translations: {
          create:
            data.translations?.map((t) => ({
              description: t.description ?? "",
              name: t.name ?? "",
              markdown: t.markdown ?? "",
              about: t.about ?? "",
              location: t.location ?? "",
              languageCode: t.languageCode ?? "",
            })) ?? [],
        },
      },
    });

    return { id: mainProject.id };
  }

  @Mutation(() => MainProjectResponse)
  async updateMainProject(
    @Arg("data", () => UpdateMainProjectInput) data: UpdateMainProjectInput,
    @Ctx() { prisma }: Context
  ): Promise<MainProjectResponse> {
    if (!data.id) {
      throw new Error("ID is required for updating a project.");
    }

    try {
      const mainProject = await prisma.mainProjects.update({
        where: { id: data.id },
        data: {
          background: data.background ?? undefined,
          mobileBackgrounds: data.mobileBackgrounds ?? undefined,
          link: data.link ?? undefined,
          video: data.video ?? undefined,
          images: data.images ?? undefined,
          skills: data.skills ?? undefined,
          github: data.github ?? undefined,
          isReal: data.isReal ?? undefined,
          translations: {
            upsert:
              data.translations?.map((t) => ({
                where: {
                  id: t.id ?? uuidv4(),
                },
                update: {
                  description: t.description ?? undefined,
                  name: t.name ?? undefined,
                  about: t.about ?? undefined,
                  markdown: t.markdown ?? undefined,
                  location: t.location ?? undefined,
                  languageCode: t.languageCode ?? undefined,
                },
                create: {
                  description: t.description ?? "",
                  name: t.name ?? "",
                  about: t.about ?? "",
                  location: t.location ?? "",
                  markdown: t.markdown ?? undefined,
                  languageCode: t.languageCode ?? "",
                  mainProjects: {
                    connect: { id: data.id },
                  },
                },
              })) ?? [],
          },
        } as Prisma.MainProjectsUpdateInput,
      });

      if (data.deletedTranslations) {
        await prisma.mainProjectsTranslations.deleteMany({
          where: {
            id: {
              in: data.deletedTranslations,
            },
          },
        });
      }

      return { id: mainProject.id };
    } catch (error) {
      console.error("Error in updateMainProject resolver:", error);
      throw new Error("Unexpected error occurred during update.");
    }
  }

  @Query(() => MainProjectResponse, { nullable: true })
  async getMainProject(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<MainProjectResponse | null> {
    return await prisma.mainProjects.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [MainProjectResponse])
  async getAllMainProjects(
    @Ctx() { prisma }: Context
  ): Promise<MainProjectResponse[]> {
    return await prisma.mainProjects.findMany({
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [MainProjectResponse])
  async getMainProjectsByIsReal(
    @Arg("isReal", () => Boolean) isReal: boolean,
    @Ctx() { prisma }: Context
  ): Promise<MainProjectResponse[]> {
    return await prisma.mainProjects.findMany({
      where: {
        isReal,
      },
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [MainProjectResponse])
  async getMainProjectsBySkills(
    @Arg("skills", () => [String]) skills: string[],
    @Ctx() { prisma }: Context
  ): Promise<MainProjectResponse[]> {
    return await prisma.mainProjects.findMany({
      where: {
        skills: {
          hasSome: skills,
        },
      },
      include: {
        translations: true,
      },
    });
  }
}
