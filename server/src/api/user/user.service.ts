import { Users } from '@entities/Users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private authService: AuthService,
  ) {}

  public async getAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  public async getByUsername(username: string): Promise<Users> {
    return await this.usersRepository.findOneBy({ username });
  }

  public async addNewUser(userinfo: CreateUserDto): Promise<Users> {
    const hashedPassword = this.authService.hashPassword(userinfo.password);
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
      hashedPassword = this.authService.hashPassword(userinfo.password);
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
