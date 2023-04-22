import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/User.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, AuthController],
})
export class ControllersModule {}
