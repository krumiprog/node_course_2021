import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../resources/users/users.module';
import { CONFIG } from '../common/config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: CONFIG.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
