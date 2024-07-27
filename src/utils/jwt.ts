import { Admin } from "@prisma/client";
import jwt from "jsonwebtoken";

function generateAccessToken(admin: Admin): string {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET not found");
  }

  return jwt.sign({ adminId: admin.id }, process.env.JWT_ACCESS_SECRET);
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
