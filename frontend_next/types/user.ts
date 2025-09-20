import { Group } from "@/types/group";

export type User = { 
    id: number; 
    name: string;
    monthlySalary: number;
    group: Group
};
