import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { SupportDeskModule } from './support-desk/support-desk.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({}),
    PrismaModule,
    PostModule,
    SupportDeskModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
