import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  ObjectType,
  Field,
  InputType,
} from "type-graphql";
import { Context } from "..";

@ObjectType()
class Social {
  @Field(() => String)
  id: string | undefined;

  @Field(() => String, { nullable: true })
  profileId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  link?: string;
}

@InputType()
class CreateSocialInput {
  @Field(() => String, { nullable: true })
  profileId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  link?: string;
}

@InputType()
class UpdateSocialInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  profileId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  link?: string;
}

@ObjectType()
class SocialResponse {
  @Field(() => String, { nullable: true })
  id?: string;
}

@Resolver()
export class SocialsResolver {
  @Mutation(() => SocialResponse)
  async createSocial(
    @Arg("data", () => CreateSocialInput) data: CreateSocialInput,
    @Ctx() { prisma }: Context
  ): Promise<SocialResponse> {
    const social = await prisma.socials.create({
      data: {
        profileId: data.profileId || "",
        name: data.name || "",
        link: data.link || "",
      },
    });

    return { id: social.id };
  }

  @Mutation(() => SocialResponse)
  async updateSocial(
    @Arg("data", () => UpdateSocialInput) data: UpdateSocialInput,
    @Ctx() { prisma }: Context
  ): Promise<SocialResponse> {
    const social = await prisma.socials.update({
      where: { id: data.id || "" },
      data: {
        profileId: data.profileId || undefined,
        name: data.name || undefined,
        link: data.link || undefined,
      },
    });

    return { id: social.id };
  }

  @Mutation(() => SocialResponse)
  async deleteSocial(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: Context
  ): Promise<SocialResponse> {
    const social = await prisma.socials.delete({
      where: { id },
    });

    return { id: social.id };
  }

  @Query(() => [Social])
  async getSocials(@Ctx() { prisma }: Context): Promise<Social[]> {
    return prisma.socials.findMany();
  }
}
