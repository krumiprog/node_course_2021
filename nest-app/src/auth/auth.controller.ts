import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authDto: AuthDto) {
    const token = await this.authService.login(authDto);

    if (token) {
      return { token };
    } else {
      throw new ForbiddenException();
    }
  }
}
