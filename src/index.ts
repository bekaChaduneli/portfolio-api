import express from "express";
import { PrismaClient } from "@prisma/client";
import { buildGqlSchema } from "./schema";
import { config } from "dotenv";
import { createYoga } from "graphql-yoga";
import cors from "cors";
import { archiveExtensions, mainProjectsExtensions } from "./extensions";

config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3000;
export const prisma = new PrismaClient({
  log: ["error"],
});

const xprisma = prisma
  .$extends(mainProjectsExtensions)
  .$extends(archiveExtensions);

export interface Context {
  prisma: PrismaClient;
}

async function main() {
  const schema = await buildGqlSchema();

  const yoga = createYoga({
    schema,
    context: (): Context => ({ prisma: xprisma as unknown as PrismaClient }),
    cors: {
      origin: "*",
    },
    // graphiql: false,
  });

  app.use(yoga.graphqlEndpoint, yoga);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
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
