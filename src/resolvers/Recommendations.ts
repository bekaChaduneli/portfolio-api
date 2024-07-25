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
class CreateRecommendationInput {
  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => Date, { nullable: true })
  date: Date | undefined;

  @Field(() => [CreateRecommendationTranslationInput], { nullable: true })
  translations: CreateRecommendationTranslationInput[] | undefined;
}

@InputType()
class CreateRecommendationTranslationInput {
  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  name: string | undefined;

  @Field(() => String, { nullable: true })
  bio: string | undefined;

  @Field(() => String, { nullable: true })
  role: string | undefined;

  @Field(() => String, { nullable: true })
  description: string | undefined;
}

@InputType()
class UpdateRecommendationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  image: string | undefined;

  @Field(() => Date, { nullable: true })
  date: Date | undefined;

  @Field(() => [UpdateRecommendationTranslationInput], { nullable: true })
  translations: UpdateRecommendationTranslationInput[] | undefined;

  @Field(() => [String], { nullable: true })
  deletedTranslations: string[] | undefined;
}

@InputType()
class UpdateRecommendationTranslationInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  languageCode: string | undefined;

  @Field(() => String, { nullable: true })
  name: string | undefined;

  @Field(() => String, { nullable: true })
  bio: string | undefined;

  @Field(() => String, { nullable: true })
  role: string | undefined;

  @Field(() => String, { nullable: true })
  description: string | undefined;
}

@ObjectType()
class RecommendationResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class RecommendationResolver {
  @Mutation(() => RecommendationResponse)
  async createRecommendation(
    @Arg("data", () => CreateRecommendationInput)
    data: CreateRecommendationInput,
    @Ctx() { prisma }: Context
  ): Promise<RecommendationResponse> {
    const recommendation = await prisma.recommendations.create({
      data: {
        image: data.image || "",
        date: data.date || new Date(),
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                languageCode: t.languageCode || "",
                name: t.name || "",
                bio: t.bio || "",
                role: t.role || "",
                description: t.description || "",
              })) || [],
          },
        },
      },
    });

    return { id: recommendation.id };
  }

  @Mutation(() => RecommendationResponse)
  async updateRecommendation(
    @Arg("data", () => UpdateRecommendationInput)
    data: UpdateRecommendationInput,
    @Ctx() { prisma }: Context
  ): Promise<RecommendationResponse> {
    const recommendation = await prisma.recommendations.update({
      where: { id: data.id },
      data: {
        image: data.image || undefined,
        date: data.date || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                languageCode: t.languageCode || undefined,
                name: t.name || undefined,
                bio: t.bio || undefined,
                role: t.role || undefined,
                description: t.description || undefined,
              },
              create: {
                languageCode: t.languageCode || "",
                name: t.name || "",
                bio: t.bio || "",
                role: t.role || "",
                description: t.description || "",
                recommendations: {
                  connect: { id: data.id },
                },
              },
            })) || [],
        },
      } as Prisma.RecommendationsUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.recommendationsTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: recommendation.id };
  }
}
