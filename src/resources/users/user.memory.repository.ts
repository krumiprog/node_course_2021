import DB from '../../db/inMemoryDb';
import User from './user.model';

class UserRepository {
  static getAll(): User[] {
    return DB.users;
  }

  static getById(id: string): User | undefined {
    return DB.users.find((user) => user.id === id);
  }

  static save(user: User): User {
    DB.users.push(user);
    return user;
  }

  static update(id: string, newUser: User): User | undefined {
    const match = DB.users.find((user) => user.id === id);

    if (match) {
      match.name = newUser.name;
      match.login = newUser.login;
      match.password = newUser.password;
    }

    return match;
  }

  static remove(id: string): number {
    const match = DB.users.findIndex((user) => user.id === id);
    DB.users.splice(match, 1);

    DB.tasks = DB.tasks.map((task) => {
      if (task.userId === id) {
        return { ...task, userId: null };
      }
      return task;
    });

    return match;
  }
}

export default UserRepository;
