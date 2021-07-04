import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto): Promise<string | undefined> {
    const user = await this.usersService.findOneByLogin(authDto.login);

    if (user) {
      const match = await compare(authDto.password, user.password);

      if (match) {
        return this.jwtService.sign({ userId: user.id, login: user.login });
      }
    }
  }
}
