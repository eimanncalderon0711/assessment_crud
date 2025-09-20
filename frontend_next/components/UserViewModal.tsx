"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Users, DollarSign, BadgeCheck } from "lucide-react";
import { Group } from "@/types/group";

type Props = {
  name: string;
  monthlySalary: number;
  group: Group;
  status?: string; // optional if you want to pass Active/Inactive
};

export default function UserViewModal({
  name,
  monthlySalary,
  group,
  status = "Active",
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-2xl shadow-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold">{name}</DialogTitle>
          <DialogDescription>
            Detailed information about this user
          </DialogDescription>
        </DialogHeader>

        {/* Info grid */}
        <div className="grid gap-4 mt-4">
          <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <Users className="h-5 w-5 text-sky-600" />
            <div>
              <p className="text-sm text-slate-500">Group</p>
              <p className="font-medium">{group ? group.name : "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <DollarSign className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-slate-500">Monthly Salary</p>
              <p className="font-medium">₱{monthlySalary.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <BadgeCheck
              className={`h-5 w-5 ${
                status === "Active" ? "text-emerald-600" : "text-red-600"
              }`}
            />
            <div>
              <p className="text-sm text-slate-500">Status</p>
              <p
                className={`font-medium ${
                  status === "Active" ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {status}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
