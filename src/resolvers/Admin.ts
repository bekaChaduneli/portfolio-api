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
import { Admin, Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hashToken } from "../utils";

import { GraphQLError } from "graphql";

@InputType()
class CreateAdminInput {
  @Field(() => String, { nullable: true })
  email: string | undefined;

  @Field(() => String, { nullable: true })
  password: string | undefined;
}

@ObjectType()
class IsTokenValidResponse {
  @Field(() => Boolean, { nullable: true })
  isValid: boolean | undefined;

  @Field(() => String, { nullable: true })
  token: string | undefined;

  @Field(() => AdminResponse, { nullable: true })
  admin: Admin | undefined;
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
  id?: string;
}

@ObjectType()
class TokenResponse {
  @Field(() => String)
  token: string | undefined;

  @Field(() => AdminResponse, { nullable: true })
  admin?: AdminResponse;
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

  @Mutation(() => TokenResponse)
  async loginAdmin(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { prisma }: Context
  ) {
    const admin = await prisma.admin.findUnique({
      where: { email: email.trim() },
    });

    if (!admin) {
      throw new GraphQLError("Admin not found!");
    }

    const valid = hashToken(password) === admin.password;

    if (!valid) {
      throw new GraphQLError("Incorrect email or password!");
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET!);

    return { token, admin };
  }

  @Mutation(() => IsTokenValidResponse)
  async validateToken(
    @Arg("token", () => String) token: string,
    @Ctx() { prisma }: Context
  ) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      const admin = await prisma.admin.findUnique({
        where: { id: decoded.id },
      });

      if (!admin) {
        throw new GraphQLError("ეს ადმინი არ არსებობს");
      }

      return { token, isValid: true, admin };
    } catch (error) {
      return { isValid: false };
    }
  }
}
