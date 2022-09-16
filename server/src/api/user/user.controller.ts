import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':username')
  @UsePipes(
    new ValidationPipe({ skipMissingProperties: false, whitelist: true }),
  )
  async update(
    @Param('username') username: string,
    @Body() body: UpdateUserDto,
  ) {
    await this.userService.updateUser(username, body);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getUserList() {
    const userList = await this.userService.getAll();

    return { userList };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  async delete(@Param('username') username: string) {
    await this.userService.deleteUser(username);
  }
}
