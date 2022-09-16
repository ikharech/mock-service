import { Users } from '@entities/Users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppConfigService } from '@configs/app/app-config.service';

@Injectable()
export class UserService {
  saltRounds = this.configService.saltRounds;

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private configService: AppConfigService,
  ) {}

  public async getAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  public async getByUsername(username: string): Promise<Users> {
    return await this.usersRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }

  public async addNewUser(userinfo: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(
      userinfo.password,
      this.saltRounds,
    );

    return await this.usersRepository.save({
      ...userinfo,
      password: hashedPassword,
    });
  }

  public async updateUser(
    username: string,
    userinfo: UpdateUserDto,
  ): Promise<void> {
    const user: Users = await this.getByUsername(username);
    let hashedPassword;

    if (userinfo.password) {
      hashedPassword = await bcrypt.hash(userinfo.password, this.saltRounds);
    }

    await this.usersRepository.update(
      { username },
      {
        ...user,
        ...userinfo,
        ...(hashedPassword && { password: hashedPassword }),
      },
    );
  }

  public async deleteUser(username: string): Promise<void> {
    await this.usersRepository.delete({ username });
  }
}
