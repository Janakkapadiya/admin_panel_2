import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/User.controller';
import { RoleGuard } from 'src/infrastructure/common/guards/roles.guard';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, AuthController],
  providers: [RoleGuard],
})
export class ControllersModule {}
