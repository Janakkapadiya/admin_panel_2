import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionFilter } from './core/all-exception-filter';
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
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    // type: 'mysql',
    // host: process.env.DB_HOST,
    // port: parseInt(<string>process.env.DB_PORT),
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    // autoLoadEntities: true,
    // }),
    UserModule,
    AuthModule,
    PrismaModule,
    PostModule,
    SupportDeskModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class AppModule {}
