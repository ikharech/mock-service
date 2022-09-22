import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from '@entities/Companies';
import { Repository } from 'typeorm';
import { CompanyDto } from './dto/base-company.dto';
import { Users } from '@entities/Users';
import { UserService } from '../user/user.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Companies)
    private companyRepository: Repository<Companies>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private userService: UserService,
  ) {}

  public async addCompany(
    username: string,
    companyDto: CompanyDto,
  ): Promise<Companies> {
    const user = await this.userService.getByUsername(username);

    return await this.companyRepository.save({ ...companyDto, user });
  }

  public async updateCompany(
    id: string,
    companyDto: CompanyDto,
  ): Promise<Companies> {
    return await this.companyRepository.save({
      ...companyDto,
      id: +id,
    });
  }

  public async deleteCompany(name: string): Promise<void> {
    await this.companyRepository.delete({ name });
    return;
  }

  public async getCompany(name: string): Promise<Companies> {
    return await this.companyRepository.findOne({
      where: {
        name: name,
      },
    });
  }
}
