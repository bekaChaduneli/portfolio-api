export interface CustomFilter {
  date?: {
    start: Date;
    end: Date;
  };
  skills?: string[];
  isReal?: boolean;
  order?: "asc" | "desc";
}
