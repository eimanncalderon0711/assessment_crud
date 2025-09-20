'use client';
import { SelectScrollable } from "@/components/SelectScrollable"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GroupService } from "@/services/group.service";
import { UserService } from "@/services/user.service";
import { Group } from "@/types/group";
import { User } from "@/types/user";
import { PlusCircleIcon, SquarePen } from "lucide-react"
import React from "react"
import { toast } from "sonner";

type Props = {
  user?: Partial<User>;         // if passed → edit mode
  onSaved?: () => void;  // callback to refresh list
};

export function UserForm({user, onSaved}: Props) {
  const [selectGroup, setSelectGroup] = React.useState<Group[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState<string>(user?.name || "");
  const [monthlySalary, setMonthlySalary] = React.useState<string>(user?.monthlySalary?.toString() || "");
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(user?.group?.id.toString() || null);

  const [open, setOpen] = React.useState(false); // 🔹 control modal state

  const isEdit = !!user;

  // Fetch all groups to create groups selection dropdown
  const fetchGroups = async () => {
    try {
      const res = await GroupService.getAll();
      setSelectGroup(res)
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  // Submit user creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // To check and validate the name if empty or white space only.
    const onlyWhitespace = /^\s*$/; 
    
    if(!name || Number(monthlySalary) < 1 || !selectedGroup || onlyWhitespace.test(name)){
      toast.error("Error", {
        description:"Failed to create User. All fields are required",
      });
      return
    }

    try {
      setLoading(true);

      if (isEdit) {
        // 🔹 Edit group
        await UserService.update(user.id!, { name, monthlySalary: Number(monthlySalary), groupId: Number(selectedGroup) });
        toast.success("Group Updated", {
          description: `The User "${name}" was updated successfully.`,
        });
      } else {
        // 🔹 Create group
        await UserService.create({ name, monthlySalary: Number(monthlySalary), groupId: Number(selectedGroup) });
        toast.success("Group Created", {
          description: `The User "${name}" was added successfully.`,
        });
      }

      setName("");
      onSaved?.();
      setOpen(false); // 🔹 auto-close after success
    } catch (err) {
      toast.error("Error", {
        description: isEdit
          ? "Failed to update group. Please try again."
          : "Failed to create group. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchGroups();
  },[])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={isEdit ? "bg-sky-600" : "bg-sky-600 text-white"}>
          {isEdit ? (
            <>
              <SquarePen /> Edit
            </>
          ) : (
            <>
              <PlusCircleIcon /> Add User
            </>
          )}
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit" : "Add User"}</DialogTitle>
              <DialogDescription>
                {isEdit ? "Edit" : "Add"} the name of user and monthly salary. Click add when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            {/* Input fields for Name and Salary */}
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required id="name-1" name="name" placeholder="ex.Pedro Duarte"/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="monthlySalary-1">Monthly Salary</Label>
                <Input value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} required type="number" placeholder="ex.25000" id="monthlySalary-1" name="monthlySalary" />
              </div>
              <div>
                <SelectScrollable 
                selectGroup={selectGroup}
                value={selectedGroup}
                onChange={(value) => {
                  setSelectedGroup(value);
                }}
              />
              </div>
            </div>

            {/* Action buttons */}
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
              {loading ? (isEdit ? "Saving..." : "Adding...") : isEdit ? "Save" : "Add User"}
            </Button>
            </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}