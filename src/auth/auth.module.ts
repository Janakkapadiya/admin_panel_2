import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalSerializer } from './local.serialize';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, LocalStrategy, LocalSerializer],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    PassportModule.register({ session: true }),
    UserModule,
  ],
})
export class AuthModule {}
