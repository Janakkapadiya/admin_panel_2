import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from 'src/domain/interface/AdminRepository';
import { AdminM } from 'src/domain/model/AdminM';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseAdminRepository implements AdminRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async createUserByAdmin(user: AdminM): Promise<AdminM> {
    const newUser = this.userEntityRepository.create(user);

    // const encryptedUserId = encrypt(newUser.id + '');
    // sendEmail(newUser.email, `Change Your Password`, `${encryptedUserId}`);

    return newUser;
  }
}
