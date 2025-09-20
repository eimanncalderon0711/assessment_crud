import { GroupEntity } from '@/group/group.entity';
import { TaxService } from '@/tax/tax.service';
import { CreateUserDto } from '@/user/dto/createUser.dto';
import { UpdateUserDto } from '@/user/dto/updateUser.dto';
import { UserEntity } from '@/user/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
    private taxService: TaxService,
  ) {}

  /** CREATE USER */
  async create(userData: CreateUserDto) {
    const user = new UserEntity();
    user.name = userData.name;
    user.monthlySalary = userData.monthlySalary;

    const group = await this.groupRepository.findOne({
      where: { id: userData.groupId },
    });
    if (group) user.group = group;

    await this.userRepository.save(user);
    return user;
  }

  /** GET USER BY ID (excluding soft-deleted) */
  async findById(id: number) {
    const foundUser = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['group'],
    });
    if (!foundUser) throw new NotFoundException('User not found');
    return foundUser;
  }

  /** GET ALL USERS (excluding soft-deleted) */
  async findAll(search?: string) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.group', 'group')
      .where('user.deletedAt IS NULL') // filter only active users
      .orderBy('user.id', 'ASC');

    if (search) {
      query.andWhere('user.name LIKE :search', { search: `%${search}%` });
    }

    return query.getMany();
  }

  /** PAGINATED USERS (excluding soft-deleted) */
  async getPaginated(
    page: number,
    limit: number,
    search?: string,
    groupId?: number,
  ) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.group', 'group')
      .where('user.deletedAt IS NULL')
      .orderBy('user.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search)
      query.andWhere('user.name LIKE :search', { search: `%${search}%` });
    if (groupId) query.andWhere('group.id = :groupId', { groupId });

    const [users, total] = await query.getManyAndCount();

    // Calculate total annual salary and total tax
    const totalAnnualSalary = users.reduce(
      (sum, user) => sum + Number(user.monthlySalary) * 12,
      0,
    );
    const totalComputedTax = users.reduce(
      (sum, user) => sum + this.taxService.calculateTax(user.monthlySalary),
      0,
    );

    const totalPages = Math.ceil(total / limit);
    const baseUrl = `http://localhost:3000/users/paginated`;

    return {
      data: users,
      total,
      page,
      limit,
      totalPages,
      totalAnnualSalary,
      totalComputedTax,
      next:
        page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
    };
  }

  /** UPDATE USER (excluding soft-deleted) */
  async updateById(id: number, userData: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['group'],
    });
    if (!user) throw new NotFoundException('User not found');

    if (userData.groupId) {
      const group = await this.groupRepository.findOne({
        where: { id: userData.groupId },
      });
      if (!group)
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      user.group = group;
    }

    Object.assign(user, {
      name: userData.name ?? user.name,
      monthlySalary: userData.monthlySalary ?? user.monthlySalary,
    });

    await this.userRepository.save(user);
    return this.userRepository.findOne({ where: { id }, relations: ['group'] });
  }

  /** SOFT DELETE USER */
  async deleteById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['group'],
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    user.deletedAt = new Date();
    await this.userRepository.save(user);
    return { message: 'User soft-deleted' };
  }

  /** RESTORE SOFT-DELETED USER */
  async restoreById(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .withDeleted()
      .leftJoinAndSelect('user.group', 'group')
      .where('user.id = :id', { id })
      .andWhere('user.deletedAt IS NOT NULL')
      .getOne();

    if (!user) throw new NotFoundException('User not found or not deleted');

    user.deletedAt = null; // restore
    await this.userRepository.save(user);

    return user;
  }

  /** CALCULATE TAX (excluding soft-deleted) */
  async calculateTax(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['group'],
    });
    if (!user) return { message: 'User not found' };

    const tax = this.taxService.calculateTax(user.monthlySalary);
    return { tax };
  }
}
