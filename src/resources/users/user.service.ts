import { DeleteResult } from 'typeorm';
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
    return userRepository.save(user);
  }

  async update(id: string, user: IUser): Promise<User | undefined> {
    return userRepository.update(id, user);
  }

  async remove(id: string): Promise<DeleteResult> {
    return userRepository.remove(id);
  }
}

export default new UserService();
