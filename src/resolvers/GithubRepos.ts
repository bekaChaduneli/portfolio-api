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
class CreateGithubRepoInput {
  @Field(() => String, { nullable: true })
  link: string | undefined;

  @Field(() => String, { nullable: true })
  stars: string | undefined;

  @Field(() => String, { nullable: true })
  language: string | undefined;

  @Field(() => [CreateGithubRepoTranslationInput], { nullable: true })
  translations: CreateGithubRepoTranslationInput[] | undefined;
}

@InputType()
class CreateGithubRepoTranslationInput {
  @Field(() => String, { nullable: true })
  title: string | undefined;

  @Field(() => String, { nullable: true })
  description: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@InputType()
class UpdateGithubRepoInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;

  @Field(() => String, { nullable: true })
  stars: string | undefined;

  @Field(() => String, { nullable: true })
  language: string | undefined;

  @Field(() => [UpdateGithubRepoTranslationInput], { nullable: true })
  translations: UpdateGithubRepoTranslationInput[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedTranslations: string[] | undefined;
}

@InputType()
class UpdateGithubRepoTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  title: string | undefined;

  @Field(() => String, { nullable: true })
  description: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@ObjectType()
class GithubRepoResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class GithubRepoResolver {
  @Mutation(() => GithubRepoResponse)
  async createGithubRepo(
    @Arg("data", () => CreateGithubRepoInput) data: CreateGithubRepoInput,
    @Ctx() { prisma }: Context
  ): Promise<GithubRepoResponse> {
    const githubRepo = await prisma.githubRepos.create({
      data: {
        link: data.link || "",
        stars: data.stars || "",
        language: data.language || "",
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                title: t.title || "",
                description: t.description || "",
                languageCode: t.languageCode || "",
              })) || [],
          },
        },
      },
    });

    return { id: githubRepo.id };
  }

  @Mutation(() => GithubRepoResponse)
  async updateGithubRepo(
    @Arg("data", () => UpdateGithubRepoInput) data: UpdateGithubRepoInput,
    @Ctx() { prisma }: Context
  ): Promise<GithubRepoResponse> {
    const githubRepo = await prisma.githubRepos.update({
      where: { id: data.id },
      data: {
        link: data.link || undefined,
        stars: data.stars || undefined,
        language: data.language || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                title: t.title || undefined,
                description: t.description || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                title: t.title || "",
                description: t.description || "",
                languageCode: t.languageCode || "",
                githubRepos: {
                  connect: { id: data.id },
                },
              },
            })) || [],
        },
      } as Prisma.GithubReposUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.githubReposTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: githubRepo.id };
  }

  @Query(() => GithubRepoResponse, { nullable: true })
  async getGithubRepo(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<GithubRepoResponse | null> {
    return await prisma.githubRepos.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [GithubRepoResponse])
  async getAllGithubRepos(
    @Ctx() { prisma }: Context
  ): Promise<GithubRepoResponse[]> {
    return await prisma.githubRepos.findMany({
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [GithubRepoResponse])
  async getGithubReposByLanguage(
    @Arg("language", () => String) language: string,
    @Ctx() { prisma }: Context
  ): Promise<GithubRepoResponse[]> {
    return await prisma.githubRepos.findMany({
      where: { language },
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [GithubRepoResponse])
  async getGithubReposByStars(
    @Arg("stars", () => String) stars: string,
    @Ctx() { prisma }: Context
  ): Promise<GithubRepoResponse[]> {
    return await prisma.githubRepos.findMany({
      where: { stars },
      include: {
        translations: true,
      },
    });
  }
}
