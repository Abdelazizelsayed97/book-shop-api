import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EmailService } from './email.service';
import { JwtAuthService } from './jwt.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
  ],
  providers: [AuthResolver, AuthService, EmailService, JwtAuthService],
  exports: [AuthService, EmailService, JwtAuthService],
})
export class AuthModule {}
