import { DeleteResult, getRepository } from 'typeorm';
import { User } from '../entities/user';
import { IUser } from '../../types/types';

class UserRepository {
  async getAll(): Promise<User[]> {
    return getRepository(User).find();
  }

  async getById(id: string): Promise<User | undefined> {
    return getRepository(User).findOne(id);
  }

  async getByLogin(login: string): Promise<User | undefined> {
    return getRepository(User).findOne({ where: { login } });
  }

  async save(user: IUser): Promise<User> {
    const newUser = new User();
    newUser.name = user.name;
    newUser.login = user.login;
    newUser.password = user.password;

    return getRepository(User).save(newUser);
  }

  async update(id: string, newUser: IUser): Promise<User | undefined> {
    const user = await getRepository(User).findOne(id);

    if (user) {
      user.name = newUser.name;
      user.login = newUser.login;
      user.password = newUser.password;
      return getRepository(User).save(user);
    }

    return user;
  }

  async remove(id: string): Promise<DeleteResult> {
    const deleted = await getRepository(User).delete(id);

    return deleted;
  }
}

export default new UserRepository();
