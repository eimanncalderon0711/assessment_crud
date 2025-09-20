import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GroupEntity } from '@/group/group.entity';
import { UserEntity } from '@/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxModule } from '@/tax/tax.module';

@Module({
  imports:[TypeOrmModule.forFeature([GroupEntity, UserEntity]), TaxModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
