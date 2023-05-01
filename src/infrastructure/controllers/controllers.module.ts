import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/User.controller';
import { PostController } from './post/post.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, AuthController, PostController],
})
export class ControllersModule {}
