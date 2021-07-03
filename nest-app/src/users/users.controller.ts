import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userToResponse } from 'src/utils/userToResponse';
import { UserNotFoundException } from 'src/errors/user-not-found.error';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return userToResponse(newUser);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => userToResponse(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (user) {
      return userToResponse(user);
    } else {
      throw new UserNotFoundException();
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);

    if (user) {
      return userToResponse(user);
    } else {
      throw new UserNotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.usersService.remove(id);

    if (deleted.affected) {
      return;
    } else {
      throw new UserNotFoundException();
    }
  }
}
