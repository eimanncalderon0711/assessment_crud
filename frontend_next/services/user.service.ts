import api from "@/lib/api";
import { Group } from "@/types/group";
import { Paginated } from "@/types/paginated";
import { User } from "@/types/user";

export const UserService = {
  // Get all users (with optional search filter)
  async getAll(search?: string): Promise<User[]> {
    const res = await api.get("users", {
      params: search ? { search } : {}, // only include search if provided
    });
    return res.data;
  },

  //Get paginated groups
  async getPaginated(page = 1, limit = 2, search?: string, groupId?:number): Promise<Paginated<User>> {
    const res = await api.get(`/users/paginated`, {
      params: { page, limit, search, groupId},
    });
    return res.data;
  },

  // Create User
  async create(data: {name: string, monthlySalary: number, groupId: number}): Promise<User> {
    const res = await api.post("users", data);
    console.log(res)
    return res.data;
  },

  // Update user by Id
  async update(id: number, body:{name: string, monthlySalary: number, groupId: number}){
    const res = await api.put(`users/${id}`, body);
    return res.data;
  },

  // Delete user by Id
  async delete(id: number){
    const res = await api.delete(`users/${id}`);
    return res.data;
  },

  
}