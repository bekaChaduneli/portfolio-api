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
class CreateBookInput {
  @Field(() => String, { nullable: true })
  index: string | undefined;

  @Field(() => String, { nullable: true })
  pages: string | undefined;

  @Field(() => String, { nullable: true })
  readedPages: string | undefined;

  @Field(() => String, { nullable: true })
  type: string | undefined;

  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => Date, { nullable: true })
  releaseDate: Date | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;

  @Field(() => Boolean, { nullable: true })
  finished: boolean | undefined;

  @Field(() => [CreateBookTranslationInput], { nullable: true })
  translations: CreateBookTranslationInput[] | undefined;
}

@InputType()
class CreateBookTranslationInput {
  @Field(() => String, { nullable: true })
  title: string | undefined;

  @Field(() => String, { nullable: true })
  description: string | undefined;

  @Field(() => String, { nullable: true })
  author: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@InputType()
class UpdateBookInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  index: string | undefined;

  @Field(() => String, { nullable: true })
  pages: string | undefined;

  @Field(() => String, { nullable: true })
  readedPages: string | undefined;

  @Field(() => String, { nullable: true })
  type: string | undefined;

  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => Date, { nullable: true })
  releaseDate: Date | undefined;

  @Field(() => String, { nullable: true })
  link: string | undefined;

  @Field(() => Boolean, { nullable: true })
  finished: boolean | undefined;

  @Field(() => [UpdateBookTranslationInput], { nullable: true })
  translations: UpdateBookTranslationInput[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedTranslations: string[] | undefined;
}

@InputType()
class UpdateBookTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  title: string | undefined;

  @Field(() => String, { nullable: true })
  description: string | undefined;

  @Field(() => String, { nullable: true })
  author: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@ObjectType()
class BookResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class BookResolver {
  @Mutation(() => BookResponse)
  async createBook(
    @Arg("data", () => CreateBookInput) data: CreateBookInput,
    @Ctx() { prisma }: Context
  ): Promise<BookResponse> {
    const book = await prisma.books.create({
      data: {
        index: data.index || "",
        pages: data.pages || "",
        readedPages: data.readedPages || "",
        type: data.type || "",
        image: data.image || "",
        releaseDate: data.releaseDate || new Date(),
        link: data.link || "",
        finished: data.finished ?? false,
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                title: t.title || "",
                description: t.description || "",
                author: t.author || "",
                languageCode: t.languageCode || "",
              })) || [],
          },
        },
      },
    });

    return { id: book.id };
  }

  @Mutation(() => BookResponse)
  async updateBook(
    @Arg("data", () => UpdateBookInput) data: UpdateBookInput,
    @Ctx() { prisma }: Context
  ): Promise<BookResponse> {
    const book = await prisma.books.update({
      where: { id: data.id },
      data: {
        index: data.index,
        pages: data.pages || undefined,
        readedPages: data.readedPages || undefined,
        type: data.type || undefined,
        image: data.image || undefined,
        releaseDate: data.releaseDate || undefined,
        link: data.link || undefined,
        finished: data.finished ?? undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                title: t.title || undefined,
                description: t.description || undefined,
                author: t.author || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                title: t.title || "",
                description: t.description || "",
                author: t.author || "",
                languageCode: t.languageCode || "",
                books: {
                  connect: { id: data.id },
                },
              },
            })) || [],
        },
      } as Prisma.BooksUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.booksTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: book.id };
  }
}
