import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
