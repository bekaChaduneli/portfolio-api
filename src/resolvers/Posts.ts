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
class CreatePostInput {
  @Field(() => String, { nullable: true })
  linkedinId: string | undefined;

  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => String, { nullable: true })
  likes: string | undefined;

  @Field(() => String, { nullable: true })
  commentsSum: string | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;

  @Field(() => [CreatePostTranslationInput], { nullable: true })
  translations: CreatePostTranslationInput[] | undefined;
}

@InputType()
class CreatePostTranslationInput {
  @Field(() => String, { nullable: true })
  linkedinName: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  description: string | undefined;
}

@InputType()
class UpdatePostInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => String, { nullable: true })
  likes: string | undefined;

  @Field(() => String, { nullable: true })
  commentsSum: string | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;

  @Field(() => [UpdatePostTranslationInput], { nullable: true })
  translations: UpdatePostTranslationInput[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedTranslations: string[] | undefined;
}

@InputType()
class UpdatePostTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  linkedinName: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  description: string | undefined;
}

@ObjectType()
class PostResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class PostResolver {
  @Mutation(() => PostResponse)
  async createPost(
    @Arg("data", () => CreatePostInput) data: CreatePostInput,
    @Ctx() { prisma }: Context
  ): Promise<PostResponse> {
    const post = await prisma.posts.create({
      data: {
        linkedinId: data.linkedinId || "",
        image: data.image || "",
        likes: data.likes || "",
        commentsSum: data.commentsSum || "",
        link: data.link || "",
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                linkedinName: t.linkedinName || "",
                languageCode: t.languageCode || "",
                description: t.description || "",
              })) || [],
          },
        },
      },
    });

    return { id: post.id };
  }

  @Mutation(() => PostResponse)
  async updatePost(
    @Arg("data", () => UpdatePostInput) data: UpdatePostInput,
    @Ctx() { prisma }: Context
  ): Promise<PostResponse> {
    const post = await prisma.posts.update({
      where: { id: data.id },
      data: {
        image: data.image || undefined,
        likes: data.likes || undefined,
        commentsSum: data.commentsSum || undefined,
        link: data.link || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                linkedinName: t.linkedinName || undefined,
                languageCode: t.languageCode || undefined,
                description: t.description || undefined,
              },
              create: {
                linkedinName: t.linkedinName || "",
                languageCode: t.languageCode || "",
                description: t.description || "",
                posts: {
                  connect: { id: data.id },
                },
              },
            })) || [],
        },
      } as Prisma.PostsUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.postsTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: post.id };
  }

  @Query(() => PostResponse, { nullable: true })
  async getPost(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<PostResponse | null> {
    return await prisma.posts.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });
  }

  @Query(() => [PostResponse])
  async getAllPosts(@Ctx() { prisma }: Context): Promise<PostResponse[]> {
    return await prisma.posts.findMany({
      include: {
        translations: true,
      },
    });
  }
}
