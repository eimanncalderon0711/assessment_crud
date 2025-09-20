import { Totals } from "@/types/totals";
import { User } from "@/types/user";

export interface Group extends Totals {
  id: number;
  name: string;
  users?: User[];
}