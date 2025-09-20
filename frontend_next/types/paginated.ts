import { Group } from "@/types/group";
import { Totals } from "@/types/totals";

export interface Paginated<T> extends Totals  {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  next: string | null;
  prev: string | null;
};