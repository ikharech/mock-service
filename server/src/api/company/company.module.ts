import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Companies } from '@entities/Companies';
import { Users } from '@entities/Users';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Companies, Users]), UserModule],
  providers: [CompanyService],
  exports: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
