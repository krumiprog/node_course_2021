import UserRepository from './user.memory.repository.js';
import User from './user.model.js';

class UserService {
  static async getAll() {
    return UserRepository.getAll();
  }

  static async getById(id: string) {
    return UserRepository.getById(id);
  }

  static async save(user: User) {
    return UserRepository.save(user);
  }

  static async update(id: string, user: User) {
    return UserRepository.update(id, user);
  }

  static async remove(id: string) {
    return UserRepository.remove(id);
  }
}

export default UserService;
