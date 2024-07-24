import jwt from "jsonwebtoken";

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
