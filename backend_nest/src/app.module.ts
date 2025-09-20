import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TaxService } from './tax/tax.service';
import { TaxModule } from './tax/tax.module';
import ormconfig from './ormconfig'

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, GroupModule, TaxModule],
  controllers: [AppController],
  providers: [AppService, TaxService],
})
export class AppModule {}
