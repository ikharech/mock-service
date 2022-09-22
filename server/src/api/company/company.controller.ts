import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Request } from '@nestjs/common';
import { CompanyDto } from './dto/base-company.dto';
import { CustomRequest } from '@interfaces/custom-request.interfaces';

@Controller('/company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @UsePipes(
    new ValidationPipe({ skipMissingProperties: false, whitelist: true }),
  )
  async create(@Request() req: CustomRequest, @Body() body: CompanyDto) {
    return await this.companyService.addCompany(req.user.username, body);
  }
}
