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
import { hashToken } from "../utils";

@InputType()
class CreateAdminInput {
  @Field(() => String, { nullable: true })
  email: string | undefined;

  @Field(() => String, { nullable: true })
  password: string | undefined;
}

@InputType()
class UpdateAdminInput {
  @Field(() => String, { nullable: true })
  id: string | undefined;

  @Field(() => String, { nullable: true })
  email: string | undefined;

  @Field(() => String, { nullable: true })
  password: string | undefined;
}

@ObjectType()
class AdminResponse {
  @Field(() => String, { nullable: true })
  id: string | undefined;
}

@Resolver()
export class AdminResolver {
  @Mutation(() => AdminResponse)
  async createAdmin(
    @Arg("data", () => CreateAdminInput) data: CreateAdminInput,
    @Ctx() { prisma }: Context
  ): Promise<AdminResponse> {
    const hashedPassword = data.password ? await hashToken(data.password) : "";
    const myEmail = data.email ? data.email : "";
    const admin = await prisma.admin.create({
      data: {
        email: myEmail,
        password: hashedPassword,
      },
    });

    return { id: admin.id };
  }

  @Mutation(() => AdminResponse)
  async updateAdmin(
    @Arg("data", () => UpdateAdminInput) data: UpdateAdminInput,
    @Ctx() { prisma }: Context
  ): Promise<AdminResponse> {
    const updateData: Prisma.AdminUpdateInput = {
      email: data.email || undefined,
      password: data.password ? await hashToken(data.password) : undefined,
    };

    const admin = await prisma.admin.update({
      where: { id: data.id },
      data: updateData,
    });

    return { id: admin.id };
  }
}
