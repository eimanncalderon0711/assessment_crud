import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserForm } from "@/components/UserForm";
import UserViewModal from "@/components/UserViewModal";
import { Group } from "@/types/group";
import { User } from "@/types/user";
import { Eye, SquarePen, Trash2 } from "lucide-react";

type Props = {
  id: number, 
  name: string, 
  monthlySalary: number, 
  group: Group
  page: number,
  fetchUsers: (page: number) => void;
  onDelete: () => void;
}

export default function UserCard({id, name, monthlySalary, group, page, fetchUsers, onDelete}: Props) {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardAction className="bg-sky-600 text-white px-4 rounded-full">Active</CardAction>
        </CardHeader>
        <CardContent className="flex space-x-5">
          <div>
            <p className="text-slate-500">Group</p>
            <div>{group ? group.name : "N/A"}</div>
          </div>
          <div>
            <p className="text-slate-500">Monthly Salary</p>
            <div>₱{monthlySalary}</div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 xl:grid-cols-4 gap-2">
          <UserViewModal group={group} name={name} monthlySalary={monthlySalary}/>
          <UserForm user={{id, name, monthlySalary, group}} onSaved={() => fetchUsers(page)} />
          <Button variant="destructive" onClick={onDelete}><Trash2 /><span>Delete</span></Button>
        </CardFooter>
      </Card>
    </div>
  );
}
