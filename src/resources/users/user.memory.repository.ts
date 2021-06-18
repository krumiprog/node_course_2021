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
      await getRepository(User).save(user);
    }

    return user;
  }

  async remove(id: string): Promise<DeleteResult> {
    return getRepository(User).delete(id);

    // const match = DB.users.findIndex((user) => user.id === id);
    // DB.users.splice(match, 1);

    // DB.tasks = DB.tasks.map((task) => {
    //   if (task.userId === id) {
    //     return { ...task, userId: null };
    //   }
    //   return task;
    // });

    // return match;
  }
}

export default new UserRepository();
