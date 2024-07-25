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
class CreateQuestionsInput {
  @Field(() => String, { nullable: true })
  profileTranslationsId: string | undefined;

  @Field(() => [CreateQuestionsTranslationInput], { nullable: true })
  translations: CreateQuestionsTranslationInput[] | undefined;
}

@InputType()
class CreateQuestionsTranslationInput {
  @Field(() => String, { nullable: true })
  question: string | undefined;

  @Field(() => String, { nullable: true })
  answer: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@InputType()
class UpdateQuestionsInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => [UpdateQuestionsTranslationInput], { nullable: true })
  translations: UpdateQuestionsTranslationInput[] | undefined;

  @Field(() => String, { nullable: true })
  profileTranslationsId: string | undefined;

  @Field(() => [String], { nullable: true })
  deletedTranslations: string[] | undefined;
}

@InputType()
class UpdateQuestionsTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  question: string | undefined;

  @Field(() => String, { nullable: true })
  answer: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;
}

@ObjectType()
class QuestionsResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class QuestionsResolver {
  @Mutation(() => QuestionsResponse)
  async createQuestions(
    @Arg("data", () => CreateQuestionsInput) data: CreateQuestionsInput,
    @Ctx() { prisma }: Context
  ): Promise<QuestionsResponse> {
    const questions = await prisma.questions.create({
      data: {
        profileTranslations: {
          connect: { id: data.profileTranslationsId || "" },
        },
        translations: {
          create:
            data.translations?.map((t) => ({
              question: t.question || "",
              answer: t.answer || "",
              languageCode: t.languageCode || "",
            })) || [],
        },
      },
    });

    return { id: questions.id };
  }

  @Mutation(() => QuestionsResponse)
  async updateQuestions(
    @Arg("data", () => UpdateQuestionsInput) data: UpdateQuestionsInput,
    @Ctx() { prisma }: Context
  ): Promise<QuestionsResponse> {
    const questions = await prisma.questions.update({
      where: { id: data.id || "" },
      data: {
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
                question: t.question || undefined,
                answer: t.answer || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                question: t.question || "",
                answer: t.answer || "",
                languageCode: t.languageCode || "",
              },
            })) || [],
        },
      },
    });

    if (data.deletedTranslations) {
      await prisma.questionsTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: questions.id };
  }
}
