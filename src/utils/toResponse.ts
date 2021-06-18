import { User } from '../resources/entities/user';

export const toResponse = (user: User): Omit<User, 'password'> => {
  const { id, name, login } = user;
  return { id, name, login };
};
