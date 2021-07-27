import { v4 as uuid } from 'uuid';

class User {
  constructor(
    public id: string = uuid(),
    public name: string,
    public login: string,
    public password: string
  ) {}

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;