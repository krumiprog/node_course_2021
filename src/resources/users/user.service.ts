import UserRepository from './user.memory.repository.js';
import User from './user.model.js';

class UserService {
  static getAll(): User[] {
    return UserRepository.getAll();
  }

  static getById(id: string): User | undefined {
    return UserRepository.getById(id);
  }

  static save(user: User): User {
    return UserRepository.save(user);
  }

  static update(id: string, user: User): User | undefined {
    return UserRepository.update(id, user);
  }

  static remove(id: string): number {
    return UserRepository.remove(id);
  }
}

export default UserService;
