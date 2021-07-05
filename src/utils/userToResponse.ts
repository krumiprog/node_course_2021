import { User } from '../resources/users/entities/user.entity';

export const userToResponse = (
  user: User,
): Omit<User, 'password' | 'tasks'> => {
  const { id, name, login } = user;
  return { id, name, login };
};
