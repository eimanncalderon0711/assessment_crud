import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateGroupDto } from '@/group/dto/createGroup.dto';
import { UpdateGroupDto } from '@/group/dto/updateGroup.dto';
import { GroupService } from '@/group/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body(ValidationPipe) groupData: CreateGroupDto) {
    return this.groupService.create(groupData);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get('paginated')
  getPaginated(@Query() query: { page: number; limit: number; search?: string }) {
    return this.groupService.getPaginated((query.page), query.limit, query.search);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.groupService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body(ValidationPipe) groupData: UpdateGroupDto) {
    return this.groupService.updateById(id, groupData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.groupService.deleteById(id);
  }

  @Put(':id/restore')
  restore(@Param('id') id: number) {
    return this.groupService.restoreById(id);
  }
}
