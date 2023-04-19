import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM } from 'src/domain/model/UserM';
import { BcryptService } from '../services/bcrypt/bcrypt.service';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {}

  async register(user: UserM): Promise<UserM> {
    const result = await this.userEntityRepository.insert(user);
    return this.toUser(result.generatedMaps[0] as User);
  }

  async getById(id: number): Promise<UserM> {
    const found = await this.userEntityRepository.findOne({
      where: {
        id,
      },
    });
    return this.toUser(found);
  }

  async create(user: UserM): Promise<UserM> {
    const result = await this.userEntityRepository.insert(user);
    return this.toUser(result.generatedMaps[0] as User);
  }

  async getAll(): Promise<UserM[]> {
    const users = await this.userEntityRepository.find();
    return users.map((adminUserEntity) => this.toUser(adminUserEntity));
  }

  async getByEmail(email: string): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!adminUserEntity) {
      return null;
    }
    return this.toUser(adminUserEntity);
  }
  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.email = adminUserEntity.email;
    adminUser.name = adminUserEntity.username;
    adminUser.password = adminUserEntity.password;
    adminUser.role = adminUserEntity.roles;

    return adminUser;
  }

  private toUserEntity(adminUser: UserM): User {
    const adminUserEntity: User = new User();

    adminUserEntity.email = adminUser.email;
    adminUserEntity.password = adminUser.password;

    return adminUserEntity;
  }
}
