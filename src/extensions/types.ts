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

export interface FindManyWithFiltersArgs
  extends Omit<Prisma.MainProjectsFindManyArgs, "where" | "orderBy"> {
  isReal?: boolean;
  skill?: string;
  dateOrder?: "asc" | "desc";
}
