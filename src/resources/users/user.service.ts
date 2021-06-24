import bcrypt from 'bcrypt';
import { DeleteResult } from 'typeorm';
import config from '../../common/config';
import userRepository from './user.repository';
import { User } from '../entities/user';
import { IUser } from '../../types/types';

class UserService {
  async getAll(): Promise<User[]> {
    return userRepository.getAll();
  }

  async getById(id: string): Promise<User | undefined> {
    return userRepository.getById(id);
  }

  async save(user: IUser): Promise<User> {
    const salt = await bcrypt.genSalt(Number(config.SALT_ROUNDS));
    const hashPassword = await bcrypt.hash(user.password, salt);
    return userRepository.save({ ...user, password: hashPassword });
  }

  async update(id: string, user: IUser): Promise<User | undefined> {
    return userRepository.update(id, user);
  }

  async remove(id: string): Promise<DeleteResult> {
    return userRepository.remove(id);
  }
}

export default new UserService();
