import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AppConfigService } from '@configs/app/app-config.service';
import { Users } from '@entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private configService: AppConfigService,
    private jwtService: JwtService,
  ) {}

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<Users, 'password'> | null> {
    const user = await this.getByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }

    return;
  }

  login(user: Users): any {
    const userinfo = {
      username: user.username,
      role: user.role.name,
    };
    const accessToken = this.generateJwtToken(userinfo);

    return {
      accessToken,
    };
  }

  generateJwtToken(data: any): string {
    const authSecret = this.configService.authSecret;

    return this.jwtService.sign(data, {
      secret: authSecret,
      expiresIn:
        parseInt(this.configService.authTokenLifetime as string, 10) * 60,
    });
  }

  public async getByUsername(username: string): Promise<Users> {
    return await this.usersRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }
}
