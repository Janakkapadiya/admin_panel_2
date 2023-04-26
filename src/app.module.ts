import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { UserController } from './infrastructure/controllers/user/User.controller';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { AppService } from './app.service';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
    RepositoriesModule,
  ],
  controllers: [AppController, UserController],
  providers: [LocalStrategy, JwtStrategy, AppService],
})
export class AppModule {}
