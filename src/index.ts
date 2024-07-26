// index.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
import { buildGqlSchema } from "./schema";
import { config } from "dotenv";
import { createYoga } from "graphql-yoga";
import cors from "cors";
import { mainProjectsExtensions } from "./extensions";

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
}).$extends(mainProjectsExtensions);

export interface Context {
  prisma: typeof prisma;
}

async function main() {
  const schema = await buildGqlSchema();

  const yoga = createYoga({
    schema,
    context: (): Context => ({ prisma }),
    cors: {
      origin: "*",
    },
    graphiql: process.env.NODE_ENV === "development",
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
