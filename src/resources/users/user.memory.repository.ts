import DB from '../../db/inMemoryDb.js';
import User from './user.model.js';

class UserRepository {
  static async getAll(): Promise<User[]> {
    return DB.users;
  }

  static async getById(id: string): Promise<User | undefined> {
    return await DB.users.find((user) => user.id === id);
  }

  static async save(user: User): Promise<User> {
    await DB.users.push(user);
    return user;
  }

  static async update(id: string, newUser: User): Promise<User | undefined> {
    const match = await DB.users.find((user) => user.id === id);

    if (match) {
      match.name = newUser.name;
      match.login = newUser.login;
      match.password = newUser.password;
    }

    return match;
  }

  static async remove(id: string) {
    const match = await DB.users.findIndex((user) => user.id === id);
    DB.users.splice(match, 1);

    DB.tasks = DB.tasks.map((task) => {
      if (task.userId === id) {
        return { ...task, userId: null };
      }
      return task;
    });
  }
}

export default UserRepository;
