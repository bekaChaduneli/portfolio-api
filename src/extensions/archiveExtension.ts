import { Prisma } from "@prisma/client";
import { ArchiveFindManyWithFiltersArgs } from "./types"; // Adjust path as needed
import { prisma } from "..";

export const archiveExtensions = Prisma.defineExtension({
  name: "archiveExtensions",
  model: {
    archive: {
      async findMany(args: ArchiveFindManyWithFiltersArgs) {
        const { isReal, skill, dateOrder, ...restArgs } = args;

        const where: Prisma.ArchiveWhereInput = {
          isReal: isReal !== undefined ? isReal : undefined,
          skills: skill ? { has: skill } : undefined,
        };

        const orderBy: Prisma.ArchiveOrderByWithRelationInput = {
          createdAt: dateOrder || "asc",
        };

        return prisma.archive.findMany({
          ...restArgs,
          where,
          orderBy,
        });
      },
    },
  },
});
