import { CreateUserDto } from '@/user/dto/createUser.dto';
import { PaginationDto } from '@/user/dto/pagination.dto';
import { UpdateUserDto } from '@/user/dto/updateUser.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** CREATE USER */
  @Post()
  async create(@Body(ValidationPipe) userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  /** GET ALL USERS */
  @Get()
  findAll(@Query('search') search?: string) {
    return this.userService.findAll(search);
  }

  /** GET PAGINATED USERS */
  @Get('paginated')
  getPaginated(@Query() query: PaginationDto) {
    return this.userService.getPaginated(
      query.page,
      query.limit,
      query.search,
      query.groupId,
    );
  }

  /** GET USER BY ID */
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  /** CALCULATE TAX */
  @Get(':id/tax')
  async calculateTax(@Param('id') id: number) {
    return this.userService.calculateTax(id);
  }

  /** UPDATE USER */
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) userData: UpdateUserDto,
  ) {
    return this.userService.updateById(id, userData);
  }

  /** SOFT DELETE USER */
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.deleteById(id);
  }

  /** RESTORE SOFT-DELETED USER */
  @Put(':id/restore')
  async restore(@Param('id') id: number) {
    return this.userService.restoreById(id);
  }
}
