import { GroupForm } from "@/components/GroupForm";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Calendar1, Eye, Landmark, SquarePen, Trash2, Users } from "lucide-react";
import { useRouter } from "next/navigation";


type Props = {
  id: number,
  name: string,
  monthlyTotalSalary: number,
  totalAnnualSalary: number,
  totalUsers: number,
  page: number,
  fetchGroups: (page: number) => void;
  onDelete: () => void;
}

export default function GroupCard({id, name, monthlyTotalSalary, totalAnnualSalary, totalUsers, onDelete, page, fetchGroups}: Props) {
  const router = useRouter();
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ut!</CardDescription>
          <CardAction className="text-sky-600"><Landmark strokeWidth={2.5}/></CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-y-3">
          <div>
            <p className="text-slate-600 flex gap-2"><Banknote /><span>Total Annual Salary</span></p>
            <p>₱{totalAnnualSalary}</p>
          </div>
          <div>
            <p className="text-slate-600 flex gap-2"><Calendar1 /><span>Total Monthly Salary</span></p>
            <p>₱{monthlyTotalSalary}</p>
          </div>
          <div>
            <p className="text-slate-600 flex gap-2"><Users /><span>Total Members</span></p>
            <p>{totalUsers}</p>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 xl:grid-cols-4 gap-2">
          <Button variant="outline" onClick={() => router.push(`/groups/${id}`)}><Eye /><span>View</span></Button>
          <GroupForm group={{ id, name}} onSaved={() => fetchGroups(page)}/>
          <Button variant="destructive" onClick={onDelete}><Trash2 /><span>Delete</span></Button>
          {/* Reusable Delete Modal */}
        </CardFooter>
      </Card>
    </div>
  );
}
