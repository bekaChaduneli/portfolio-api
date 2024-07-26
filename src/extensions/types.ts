import { Prisma } from "@prisma/client";

export interface CustomFilter {
  date?: {
    start: Date;
    end: Date;
  };
  skills?: string[];
  isReal?: boolean;
  order?: "asc" | "desc";
}

export interface ProjectsFindManyWithFiltersArgs
  extends Omit<Prisma.MainProjectsFindManyArgs, "where" | "orderBy"> {
  isReal?: boolean;
  skill?: string;
  dateOrder?: "asc" | "desc";
}

export interface ArchiveFindManyWithFiltersArgs
  extends Omit<Prisma.ArchiveFindManyArgs, "where" | "orderBy"> {
  isReal?: boolean;
  skill?: string;
  dateOrder?: "asc" | "desc";
}
