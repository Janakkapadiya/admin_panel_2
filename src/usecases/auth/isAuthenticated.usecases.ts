import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM, UserWithoutPassword } from 'src/domain/model/UserM';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) {}

  async execute(email: string): Promise<UserWithoutPassword> {
    const user: UserM = await this.adminUserRepo.getByEmail(email);
    const { password, ...info } = user;
    return info;
  }
}
