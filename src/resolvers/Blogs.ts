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
class CreateBlogsInput {
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  background?: string;

  @Field(() => [CreateBlogsTranslationInput], { nullable: true })
  translations?: CreateBlogsTranslationInput[];
}

@InputType()
class CreateBlogsTranslationInput {
  @Field(() => String, { nullable: true })
  headline?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateBlogsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => String, { nullable: true })
  background?: string;

  @Field(() => [UpdateBlogsTranslationInput], { nullable: true })
  translations?: UpdateBlogsTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
class UpdateBlogsTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  headline?: string;

  @Field(() => String, { nullable: true })
  about?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
class BlogsResponse {
  @Field(() => String, { nullable: true })
  id?: string;
}

@Resolver()
export class BlogsResolver {
  @Mutation(() => BlogsResponse)
  async createBlogs(
    @Arg("data", () => CreateBlogsInput) data: CreateBlogsInput,
    @Ctx() { prisma }: Context
  ): Promise<BlogsResponse> {
    const blogs = await prisma.blogs.create({
      data: {
        link: data.link || "",
        background: data.background || "",
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                headline: t.headline || "",
                about: t.about || "",
                languageCode: t.languageCode || "",
              })) || [],
          },
        },
      },
    });

    return { id: blogs.id };
  }

  @Mutation(() => BlogsResponse)
  async updateBlogs(
    @Arg("data", () => UpdateBlogsInput) data: UpdateBlogsInput,
    @Ctx() { prisma }: Context
  ): Promise<BlogsResponse> {
    const blogs = await prisma.blogs.update({
      where: { id: data.id || "" },
      data: {
        link: data.link || undefined,
        background: data.background || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                headline: t.headline || undefined,
                about: t.about || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                headline: t.headline || "",
                about: t.about || "",
                languageCode: t.languageCode || "",
                blogs: {
                  connect: { id: data.id || "" },
                },
              },
            })) || [],
        },
      } as Prisma.BlogsUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.blogsTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: blogs.id };
  }

  @Query(() => [BlogsResponse])
  async getBlogs(@Ctx() { prisma }: Context): Promise<BlogsResponse[]> {
    return await prisma.blogs.findMany({
      include: {
        translations: true,
      },
    });
  }

  @Query(() => BlogsResponse, { nullable: true })
  async getBlog(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<BlogsResponse | null> {
    return await prisma.blogs.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }
}
