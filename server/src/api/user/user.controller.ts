import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({ skipMissingProperties: false, whitelist: true }),
  )
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.addNewUser(body);

    if (!user) {
      return {};
    }

    return user;
  }

  @Get('/list')
  async getUserList() {
    const userList = await this.userService.getAll();

    return { userList };
  }

  @Get()
  async getOne(@Param('username') username: string) {
    const user = await this.userService.getByUsername(username);

    return user;
  }

  @Put()
  async update(
    @Param('username') username: string,
    @Body() body: UpdateUserDto,
  ) {
    await this.userService.updateUser(username, body);
  }

  @Delete()
  async delete(@Param('username') username: string) {
    await this.userService.deleteUser(username);
  }
}
