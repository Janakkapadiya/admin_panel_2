import { UserRepository } from 'src/domain/interface/UserRepository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { DatabasePostRepository } from './post.repository';
import { DatabaseUserRepository } from './user.repository';
import { Posts } from '../entities/posts.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Posts, User])],
  providers: [DatabasePostRepository, DatabaseUserRepository],
  exports: [DatabasePostRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
