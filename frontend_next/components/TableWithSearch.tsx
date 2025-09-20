"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserService } from "@/services/user.service";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";

type Props = {
  selectUserToCompute: (user: User) => void;
};

export function TableWithSearch({ selectUserToCompute }: Props) {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Method to fetch users
  const fetchUsers = async (query?: string) => {
    try {
      setLoading(true);
      const res = await UserService.getAll(query);
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  // debounce effect so that it prevents to refetch every keystroke
  React.useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers(search);
    }, 500); // debounce 500ms

    return () => {
      clearTimeout(handler); // cleanup previous timer
    };
  }, [search]);


  // initial load
  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full">
      <Input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />

      <div className="rounded-md border h-[250px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Monthly Salary</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-500">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.group?.name ?? "-"}</TableCell>
                  <TableCell>₱{user.monthlySalary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      className="bg-sky-600 cursor-pointer"
                      onClick={() => selectUserToCompute(user)}
                    >
                      Compute
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-500">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
