import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from '@entities/Companies';
import { Repository } from 'typeorm';
import { CompanyDto } from './dto/base-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Companies)
    private companyRepository: Repository<Companies>,
  ) {}

  public async addCompany(companyDto: CompanyDto): Promise<Companies> {
    return await this.companyRepository.save(companyDto);
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
