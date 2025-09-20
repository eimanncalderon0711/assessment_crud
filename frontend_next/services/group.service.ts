// services/group.service.ts
import api from "@/lib/api";
import { Group } from "@/types/group";
import { Paginated } from "@/types/paginated";

export const GroupService = {
  // Get all groups
  async getAll(): Promise<Group[]> {
    const res = await api.get("group");
    return res.data;
  },

  // Get group by Id
  async getUsers(groupId: number) {
    const res = await api.get(`/group/${groupId}`);
    return res.data;
  },

  // Get paginated groups
  async getPaginated(
    page = 1,
    limit = 2,
    search?: string
  ): Promise<Paginated<Group>> {
    const res = await api.get(`/group/paginated`, {
      params: { page, limit, search },
    });
    return res.data;
  },

  // create a new group
  async create(data: { name: string }): Promise<Group> {
    const res = await api.post("group", data);
    return res.data;
  },

  // Update group by Id
  async update(id: number, body: { name: string }) {
    const res = await api.put(`group/${id}`, body);
    return res.data;
  },

  // Delete group by Id
  async delete(id: number) {
    const res = await api.delete(`group/${id}`);
    return res.data;
  },
};
