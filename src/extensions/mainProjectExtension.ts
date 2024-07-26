// extensions.ts
import { Prisma } from "@prisma/client";
import { FindManyWithFiltersArgs } from "./types";
import { prisma } from "..";

export const mainProjectsExtensions = Prisma.defineExtension({
  name: "mainProjectsExtensions",
  model: {
    mainProjects: {
      findManyWithFilters(args: FindManyWithFiltersArgs) {
        const { isReal, skill, dateOrder, ...restArgs } = args;

        const where: Prisma.MainProjectsWhereInput = {
          isReal: isReal !== undefined ? isReal : undefined,
          skills: skill ? { has: skill } : undefined,
        };

        const orderBy: Prisma.MainProjectsOrderByWithRelationInput = {
          createdAt: dateOrder || "asc",
        };

        return prisma.mainProjects.findMany({
          ...restArgs,
          where,
          orderBy,
        });
      },
    },
  },
});
