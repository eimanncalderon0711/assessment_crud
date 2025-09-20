// group/dto/groupWithSalary.dto.ts
import { UserEntity } from '@/user/user.entity';

export class GroupWithSalaryDto {
  id: number;
  name: string;
  users: Partial<UserEntity>[]; // or a dedicated UserDto
  monthlyTotalSalary: number;
  totalAnnualSalary: number;
  totalUsers: number;
}