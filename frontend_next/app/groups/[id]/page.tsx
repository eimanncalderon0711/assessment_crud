"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GroupService } from "@/services/group.service";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id: number;
  name: string;
  monthlySalary: number;
};

export default function GroupDetailsPage() {
  const params = useParams();
  const groupId = Number(params.id);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await GroupService.getUsers(groupId); // 🔥 implement in service
        console.log(res.users)
        setUsers(res.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [groupId]);

  if (loading) return <p className="p-5">Loading users...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Group Members</h1>
      <Table>
        <TableCaption>List of users in this group</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Monthly Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.monthlySalary}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-slate-500">
                No users found in this group
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
