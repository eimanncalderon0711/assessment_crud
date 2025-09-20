import { CreateGroupDto } from '@/group/dto/createGroup.dto';
import { GroupWithSalaryDto } from '@/group/dto/groupWithSalary.dto';
import { UpdateGroupDto } from '@/group/dto/updateGroup.dto';
import { GroupEntity } from '@/group/group.entity';
import { Not, IsNull, Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
  ) {}

  /** CREATE GROUP */
  async create(groupData: CreateGroupDto) {
    const group = this.groupRepository.create(groupData);
    await this.groupRepository.save(group);
    return group;
  }

  /** GET GROUP BY ID (excluding soft-deleted) */
  async getById(id: number) {
    const group = await this.groupRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['users'],
    });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  /** GET ALL GROUPS (excluding soft-deleted) */
  async findAll() {
    const groups = await this.groupRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['users'],
    });
    return groups.map((g) => this.withSalaryTotals(g));
  }

  /** PAGINATED GROUPS (excluding soft-deleted) */
  async getPaginated(page: number, limit: number, search?: string) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const queryBuilder = this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .where('group.deletedAt IS NULL')
      .orderBy('group.id', 'ASC')
      .skip((pageNumber - 1) * limitNumber)
      .take(limitNumber);
    if (search) {
      queryBuilder.andWhere('group.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [groups, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    const baseUrl = `http://localhost:3000/group/paginated`;

    return {
      data: groups.map((g) => this.withSalaryTotals(g)),
      total,
      page,
      limit,
      totalPages,
      next:
        page < totalPages
          ? `${baseUrl}?page=${page + 1}&limit=${limit}${search ? `&search=${search}` : ''}`
          : null,
      prev:
        page > 1
          ? `${baseUrl}?page=${page - 1}&limit=${limit}${search ? `&search=${search}` : ''}`
          : null,
    };
  }

  /** UPDATE GROUP */
  async updateById(id: number, groupData: UpdateGroupDto) {
    const group = await this.groupRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!group) throw new NotFoundException('Group not found');

    await this.groupRepository.update(id, groupData);
    return this.groupRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  /** SOFT DELETE GROUP */
  async deleteById(id: number) {
    const group = await this.groupRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['users'],
    });
    if (!group) throw new NotFoundException('Group not found');

    group.deletedAt = new Date();
    await this.groupRepository.save(group);
    return { message: 'Group soft-deleted' };
  }

  /** RESTORE SOFT-DELETED GROUP */
  async restoreById(id: number) {
    const group = await this.groupRepository
      .createQueryBuilder('group')
      .withDeleted() // include soft-deleted
      .leftJoinAndSelect('group.users', 'users')
      .where('group.id = :id', { id })
      .andWhere('group.deletedAt IS NOT NULL')
      .getOne();

    if (!group) throw new NotFoundException('Group not found or not deleted');

    group.deletedAt = null; // restore
    await this.groupRepository.save(group);

    return group;
  }

  /** HELPER: WITH SALARY TOTALS */
  private withSalaryTotals(group: GroupEntity): GroupWithSalaryDto {
    const monthlyTotalSalary =
      group.users?.reduce((sum, user) => sum + Number(user.monthlySalary), 0) ||
      0;

    const totalAnnualSalary = monthlyTotalSalary * 12;
    const totalUsers = group.users?.length ?? 0;

    return {
      ...group,
      monthlyTotalSalary,
      totalAnnualSalary,
      totalUsers,
    };
  }
}
