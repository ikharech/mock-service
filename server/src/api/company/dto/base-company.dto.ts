import { IsOptional, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  private?: boolean;

  @IsOptional()
  @IsBoolean()
  public?: boolean;
}
