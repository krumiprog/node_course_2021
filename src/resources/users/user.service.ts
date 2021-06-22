import bcrypt from 'bcrypt';
import { DeleteResult } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import userRepository from './user.repository';
import { User } from '../entities/user';
import { IUser } from '../../types/types';
import ApiError from '../../error/ApiError';

class UserService {
  async getAll(): Promise<User[]> {
    return userRepository.getAll();
  }

  async getById(id: string): Promise<User | undefined> {
    return userRepository.getById(id);
  }

  async getByLogin(login: string, password: string): Promise<User | undefined> {
    const user = await userRepository.getByLogin(login);

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong password.');
      }
    }

    return user;
  }

  async save(user: IUser): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 5);
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
