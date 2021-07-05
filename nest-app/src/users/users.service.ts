import { genSalt, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CONFIG } from '../common/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, login, password } = createUserDto;

    const salt = await genSalt(CONFIG.SALT_ROUNDS);
    const hashPassword = await hash(password, salt);

    const newUser = new User();
    newUser.name = name;
    newUser.login = login;
    newUser.password = hashPassword;

    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async findOneByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { login } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);

    if (user) {
      user.name = updateUserDto.name;
      user.login = updateUserDto.login;
      user.password = updateUserDto.password;

      return this.usersRepository.save(user);
    }

    return user;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
