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
class CreateServicesInput {
  @Field(() => String, { nullable: true })
  background?: string;

  @Field(() => String, { nullable: true })
  order?: string;

  @Field(() => [CreateServicesTranslationInput], { nullable: true })
  translations?: CreateServicesTranslationInput[];
}

@InputType()
class CreateServicesTranslationInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@InputType()
class UpdateServicesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  background?: string;

  @Field(() => String, { nullable: true })
  order?: string;

  @Field(() => [UpdateServicesTranslationInput], { nullable: true })
  translations?: UpdateServicesTranslationInput[];

  @Field(() => [String], { nullable: true })
  deletedTranslations?: string[];
}

@InputType()
class UpdateServicesTranslationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  languageCode?: string;
}

@ObjectType()
class ServicesResponse {
  @Field(() => String, { nullable: true })
  id?: string;
}

@Resolver()
export class ServicesResolver {
  @Mutation(() => ServicesResponse)
  async createServices(
    @Arg("data", () => CreateServicesInput) data: CreateServicesInput,
    @Ctx() { prisma }: Context
  ): Promise<ServicesResponse> {
    const services = await prisma.services.create({
      data: {
        background: data.background || "",
        order: data.order || "",
        translations: {
          createMany: {
            data:
              data.translations?.map((t) => ({
                name: t.name || "",
                description: t.description || "",
                languageCode: t.languageCode || "",
              })) || [],
          },
        },
      },
    });

    return { id: services.id };
  }

  @Mutation(() => ServicesResponse)
  async updateServices(
    @Arg("data", () => UpdateServicesInput) data: UpdateServicesInput,
    @Ctx() { prisma }: Context
  ): Promise<ServicesResponse> {
    const services = await prisma.services.update({
      where: { id: data.id || "" },
      data: {
        background: data.background || undefined,
        order: data.order || undefined,
        translations: {
          upsert:
            data.translations?.map((t) => ({
              where: {
                id: t.id || uuidv4(),
              },
              update: {
                name: t.name || undefined,
                description: t.description || undefined,
                languageCode: t.languageCode || undefined,
              },
              create: {
                name: t.name || "",
                description: t.description || "",
                languageCode: t.languageCode || "",
                services: {
                  connect: { id: data.id || "" },
                },
              },
            })) || [],
        },
      } as Prisma.ServicesUpdateInput,
    });

    if (data.deletedTranslations) {
      await prisma.servicesTranslations.deleteMany({
        where: {
          id: {
            in: data.deletedTranslations,
          },
        },
      });
    }

    return { id: services.id };
  }

  @Query(() => [ServicesResponse])
  async getServices(@Ctx() { prisma }: Context): Promise<ServicesResponse[]> {
    const services = await prisma.services.findMany();
    return services.map((service) => ({ id: service.id }));
  }

  @Query(() => ServicesResponse, { nullable: true })
  async getService(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<ServicesResponse | null> {
    const service = await prisma.services.findUnique({ where: { id } });
    return service ? { id: service.id } : null;
  }
}
