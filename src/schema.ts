import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as CustomResolvers from "./resolvers";
import { resolvers as generatedResolvers } from "@generated/type-graphql";

export const buildGqlSchema = async () => {
  const customResolversArray = Object.values(CustomResolvers).filter(
    (resolver) => typeof resolver === "function"
  );

  const schema = await buildSchema({
    resolvers: [...generatedResolvers, ...customResolversArray],
    validate: false,
  });

  return schema;
};
