import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "@generated/type-graphql";
import * as CustomResolvers from "./resolvers";

export const buildGqlSchema = async () => {
  // Convert CustomResolvers to an array of functions
  const customResolversArray = Object.values(CustomResolvers).filter(
    (resolver) => typeof resolver === "function"
  );

  const schema = await buildSchema({
    resolvers: [...resolvers, ...customResolversArray] as [
      Function,
      ...Function[]
    ],
    validate: false,
  });

  return schema;
};
