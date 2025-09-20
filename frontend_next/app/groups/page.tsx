"use client";
import GroupCard from "@/components/GroupCard";
import { GroupForm } from "@/components/GroupForm";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GroupService } from "@/services/group.service";
import { Group } from "@/types/group";
import { Paginated } from "@/types/paginated";
import { useEffect, useState } from "react";

export default function Groups() {
  const [groups, setGroups] = useState<Paginated<Group>>();
  const [page, setPage] = useState(1);
  const [limit] = useState(4); // adjust how many per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const fetchGroups = async (pageNum?: number, query?: string) => {
    try {
      const res = await GroupService.getPaginated(pageNum, limit, query);
      setGroups(res);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await GroupService.delete(deleteId); // 🔥 implement in service
        fetchGroups(page); // refresh list
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchGroups(1, search); // reset to page 1 when searching
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchGroups(page);
  }, [page]);

  return (
    <div className="py-5">
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
      <header>
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <h1 className="font-extrabold text-2xl">Groups Overview</h1>
            <p className="text-slate-600">Manage groups</p>
          </div>
          <div className="mr-5 lg:mr-10">
            <GroupForm onSaved={() => fetchGroups(page)} />
          </div>
        </div>
        <Input
          placeholder="Search by groups"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 max-w-sm my-2"
        />
      </header>

      <main className="mt-5">
        {/* groups list */}
        {groups?.data.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {search
              ? "No groups found for your search."
              : "No available groups."}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {groups?.data.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.name}
                totalUsers={group.totalUsers}
                monthlyTotalSalary={group.monthlyTotalSalary}
                totalAnnualSalary={group.totalAnnualSalary}
                fetchGroups={() => fetchGroups(page)}
                page={page}
                onDelete={() => {
                  setDeleteId(group.id); // set id
                  setIsModalOpen(true); // open modal
                }}
              />
            ))}
          </div>
        )}

        {/* pagination controls */}
        {groups?.data.length !== 0 && (
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={() => setPage((p) => p - 1)}
              disabled={!groups?.prev}
              className="px-6 bg-sky-600"
            >
              Previous
            </Button>

            <span className="flex items-center text-slate-600">
              Page {groups?.page} of {groups?.totalPages}
            </span>

            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={!groups?.next}
              className="px-6 bg-sky-600"
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
