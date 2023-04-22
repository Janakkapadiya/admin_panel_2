import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from 'src/domain/interface/AdminRepository';
import { AdminM } from 'src/domain/model/AdminM';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserM } from 'src/domain/model/UserM';

@Injectable()
export class DatabaseAdminRepository implements AdminRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async createUserByAdmin(user: AdminM): Promise<UserM> {
    const newUser = this.userEntityRepository.insert(user);

    // const encryptedUserId = encrypt(newUser.id + '');
    // sendEmail(newUser.email, `Change Your Password`, `${encryptedUserId}`);

    return newUser;
  }
}
