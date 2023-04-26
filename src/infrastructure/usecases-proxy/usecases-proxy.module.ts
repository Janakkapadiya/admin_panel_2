import { DynamicModule, Module } from '@nestjs/common';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseUserRepository } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { DatabasePostRepository } from '../repositories/post.repository';
import { getPostUseCase } from 'src/usecases/post/getPost.usecase';
import { getAllPostUseCase } from 'src/usecases/post/getAllPost.usecase';
import { createPostUseCase } from 'src/usecases/post/createPost.usecase';
import { deletePostUseCase } from 'src/usecases/post/deletePost.usecase';
import { getUsersUseCases } from 'src/usecases/user/all.user.usecase';
import { getUserByIdUseCases } from 'src/usecases/user/getById.user.usecase';
import { registerUseCases } from 'src/usecases/auth/register.usecase';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static GET_POST_USECASES_PROXY = 'getPostUsecasesProxy';
  static GET_POSTS_USECASES_PROXY = 'getPostsUsecasesProxy';
  static CREATE_POST_USECASES_PROXY = 'createPostUsecasesProxy';
  static DELETE_POST_USECASES_PROXY = 'deletePostUsecasesProxy';

  static GET_USERS_USECASES_PROXY = 'deleteUserUsecasesProxy';
  static GET_USER_BY_ID_USECASES_PROXY = 'deleteUserUsecasesProxy';
  // signup
  static CREATE_USER_USECASES_PROXY = 'createUserUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabasePostRepository],
          provide: UsecasesProxyModule.GET_POST_USECASES_PROXY,
          useFactory: (postRepository: DatabasePostRepository) =>
            new UseCaseProxy(new getPostUseCase(postRepository)),
        },
        {
          inject: [DatabasePostRepository, LoggerService],
          provide: UsecasesProxyModule.GET_POSTS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
          ) => new UseCaseProxy(new getAllPostUseCase(logger, postRepository)),
        },
        {
          inject: [LoggerService, DatabasePostRepository],
          provide: UsecasesProxyModule.CREATE_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
          ) => new UseCaseProxy(new createPostUseCase(logger, postRepository)),
        },
        {
          inject: [LoggerService, DatabasePostRepository],
          provide: UsecasesProxyModule.DELETE_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
          ) => new UseCaseProxy(new deletePostUseCase(logger, postRepository)),
        },
        {
          inject: [DatabaseUserRepository, LoggerService, BcryptService],
          provide: UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new registerUseCases(logger, userRepository, bcryptService),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new getUsersUseCases(userRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_BY_ID_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new getUserByIdUseCases(userRepository)),
        },
      ],

      exports: [
        UsecasesProxyModule.GET_POST_USECASES_PROXY,
        UsecasesProxyModule.GET_POSTS_USECASES_PROXY,
        UsecasesProxyModule.CREATE_POST_USECASES_PROXY,
        UsecasesProxyModule.DELETE_POST_USECASES_PROXY,
        // **********
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        // **********
        UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_BY_ID_USECASES_PROXY,
      ],
    };
  }
}
