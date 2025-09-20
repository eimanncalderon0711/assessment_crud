import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import { GroupService } from "@/services/group.service";
import { Group } from "@/types/group";


type Props = {
  group?: Partial<Group>;         // if passed → edit mode
  onSaved?: () => void;  // callback to refresh list
};

export function GroupForm({ group, onSaved }: Props) {
  const [name, setName] = useState(group?.name || "");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // 🔹 control modal state

  const isEdit = !!group;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        // 🔹 Edit group
        await GroupService.update(group.id!, { name });
        toast.success("Group Updated", {
          description: `The group "${name}" was updated successfully.`,
        });
      } else {
        // 🔹 Create group
        await GroupService.create({ name });
        toast.success("Group Created", {
          description: `The group "${name}" was added successfully.`,
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
  };

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
              <PlusCircleIcon /> Add Group
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Group" : "Add Group"}</DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update the name of the group and click save when you’re done."
                : "Add the name of the group. Click add when you’re done."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="ex. High Income"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="my-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? (isEdit ? "Saving..." : "Adding...") : isEdit ? "Save" : "Add Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
