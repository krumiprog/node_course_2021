import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../users/user.repository';
import { User } from '../entities/user';
import ApiError from '../../error/ApiError';

class LoginService {
  async getUser(login: string, password: string): Promise<User | undefined> {
    const user = await userRepository.getByLogin(login);

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Wrong password.');
      }
    }

    return user;
  }
}

export default new LoginService();
