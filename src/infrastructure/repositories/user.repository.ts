import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM } from 'src/domain/model/UserM';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async register(user: UserM): Promise<UserM> {
    const result = await this.userEntityRepository.save(user);
    return this.toUserM(result);
  }

  async findById(id: number): Promise<UserM> {
    const found = await this.userEntityRepository.findOne({
      where: {
        id,
      },
    });
    return this.toUserM(found);
  }

  async createUser(user: UserM): Promise<UserM> {
    const result = await this.userEntityRepository.save(user);
    console.log('the generated maps', result);
    return this.toUserM(result);
  }

  async findAll(): Promise<UserM[]> {
    const users = await this.userEntityRepository.find();
    return users.map((adminUserEntity) => this.toUserM(adminUserEntity));
  }

  async findByEmail(email: string): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!adminUserEntity) {
      return null;
    }
    return adminUserEntity;
  }

  private toUserM(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.email = adminUserEntity.email;
    adminUser.name = adminUserEntity.name;
    adminUser.password = adminUserEntity.password;
    adminUser.role = adminUserEntity.role;

    return adminUser;
  }

  private toUserEntity(adminUser: UserM): User {
    const adminUserEntity: User = new User();

    adminUserEntity.id = adminUser.id;
    adminUserEntity.email = adminUser.email;
    adminUserEntity.name = adminUser.name;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.role = adminUser.role;

    return adminUserEntity;
  }
}
