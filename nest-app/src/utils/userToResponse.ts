import { User } from '../users/entities/user.entity';

export const userToResponse = (user: User): Omit<User, 'password'> => {
  const { id, name, login } = user;
  return { id, name, login };
};
