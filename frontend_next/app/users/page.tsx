"use client";
import Modal from "@/components/Modal";
import { SelectScrollable } from "@/components/SelectScrollable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/UserCard";
import { UserForm } from "@/components/UserForm";
import { GroupService } from "@/services/group.service";
import { UserService } from "@/services/user.service";
import { Group } from "@/types/group";
import { Paginated } from "@/types/paginated";
import { User } from "@/types/user";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<Paginated<User>>();
  const [page, setPage] = useState(1);
  const [limit] = useState(4); // adjust how many per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Fetch paginated users
  const fetchUsers = async (
    pageNum: number,
    query?: string,
    groupId?: number
  ) => {
    try {
      const res = await UserService.getPaginated(
        pageNum,
        limit,
        query,
        groupId ? Number(groupId) : undefined
      );
      setUsers(res);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await GroupService.getAll();
      setGroups(res);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await UserService.delete(deleteId); // 🔥 implement in service
        fetchUsers(page); // refresh list
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers(1, search, selectedGroup ? Number(selectedGroup) : undefined); // reset to page 1 when searching
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search, selectedGroup]);

  useEffect(() => {
    fetchUsers(page);
    fetchGroups();
  }, [page]);

  return (
    <div className="py-5">
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
      <header className="w-full">
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <h1 className="font-extrabold text-2xl">Users Overview</h1>
            <p className="text-slate-600">Manage User information and salary</p>
          </div>
          {/* <Button className="px-14 py-5 mr-5 lg:mr-22 bg-sky-600 "><span className="flex items-center gap-3 text-lg"><PlusCircleIcon/> Add User</span></Button> */}
          <div className="mr-5 lg:mr-10">
            <UserForm onSaved={() => fetchUsers(page)} />
          </div>
        </div>
        <Input
          placeholder="Search by names"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 max-w-sm my-2"
        />
        <div className="w-full max-w-sm">
          <SelectScrollable
            selectGroup={groups}
            value={selectedGroup}
            onChange={(value) => {
              setSelectedGroup(value);
            }}
          />
        </div>
      </header>
      <main className="mt-5">
        {/* users list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {users?.data.map((user) => {
            return (
              <UserCard
                key={user.id}
                id={user.id}
                group={user.group}
                name={user.name}
                monthlySalary={user.monthlySalary}
                fetchUsers={() => fetchUsers(page)}
                page={page}
                onDelete={() => {
                  setDeleteId(user.id); // set id
                  setIsModalOpen(true); // open modal
                }}
              />
            );
          })}
        </div>

        {/* pagination controls */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => setPage((p) => p - 1)}
            disabled={!users?.prev}
            className="px-6 bg-sky-600"
          >
            Previous
          </Button>

          <span className="flex items-center text-slate-600">
            Page {users?.page} of {users?.totalPages}
          </span>

          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={!users?.next}
            className="px-6 bg-sky-600"
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
}
