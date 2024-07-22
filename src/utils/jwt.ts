import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { prisma } from "..";

function generateAccessToken(user: User): string {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET not found");
  }

  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET);
}

export async function hasAdminPermission(
  accessToken: string | undefined
): Promise<boolean> {
  try {
    if (!accessToken) {
      return false;
    }

    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error("JWT_ACCESS_SECRET not found");
    }

    const token = accessToken.split("Bearer ")[1];

    if (!token) {
      return false;
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true },
    });

    return !!user;
  } catch (error) {
    return false;
  }
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET not found");
  }

  return (
    jwt.sign({ password }, process.env.JWT_ACCESS_SECRET) === hashedPassword
  );
}

export { generateAccessToken };
