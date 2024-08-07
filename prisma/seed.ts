import { PrismaClient } from "@prisma/client";
import { hashToken } from "../src/utils/hashToken";
import { superEmails } from "./data";
const prisma = new PrismaClient();

async function main() {
  for (const mail of superEmails) {
    process.env.password &&
      (await prisma.admin.upsert({
        where: { email: mail },
        update: {},
        create: {
          email: mail,
          password: hashToken(process.env.password),
        },
      }));
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
